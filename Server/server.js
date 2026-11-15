const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());



const TodoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    }
});


const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    todoList: [TodoSchema]
});

const UserModel = mongoose.model('users', UserSchema);

mongoose.connect(process.env.MONGO_URI);



app.get('/getUser/:id', (req, res) => {
    const { id } = req.params;

    UserModel.findOne({
        _id: id
    })
        .then(user => {
            if (user) {
                console.log(`User: ${user.email} found successfully!`);
                res.json({
                    list: user.todoList,
                    email: user.email
                });
            } else {
                console.log('User Not Found');
                res.json([]);
            }
        })
        .catch(err => res.json(err))
})



app.post('/add/:id', ((req, res) => {
    const { id } = req.params;
    const task = req.body.task;
    console.log(id);

    UserModel.findOneAndUpdate(
        { _id: id },
        { $push: { todoList: { task } } },
        { new: true }
    )
        .then(result => {
            if (!result) {
                console.log('User not found, cannot add task!!!');
                return res.status(404).json({ error: 'User not found, cannot add task' });
            }
            console.log('Task added successfully!');
            res.json(result)
        })
        .catch(err => res.json(err))
}));



app.put('/update/:userId/:taskId', (req, res) => {
    const { userId, taskId } = req.params;

    UserModel.findOne({
        _id: userId
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            let task = user.todoList.find(t => t._id.toString() === taskId);
            task.done = !task.done;
            console.log("Task's status changed successfully!");
            return user.save();
        })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})



app.delete('/deleteUser/:userId', (req, res) => {
    const { userId } = req.params;

    UserModel.findByIdAndDelete({
        _id: userId
    })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})



app.delete('/deleteTask/:userId/:taskId', (req, res) => {
    const { userId, taskId } = req.params;

    UserModel.findOne({
        _id: userId
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }

            let newList = user.todoList.filter(t => t._id.toString() !== taskId);
            user.todoList = newList;
            console.log('Task deleted successfully!');
            return user.save();
        })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})





app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    return UserModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(404).json({ error: 'Email already exists. please use a different email.' });
            }

            return bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    return UserModel.create({
                        email,
                        password: hashedPassword,
                        todoList: []
                    }).then(result => {
                        res.json(result)
                        console.log(`User: ${email} was created successfully`);
                    })
                })
        })
        .catch(err => res.json(err))
});



app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    UserModel.findOne({
        email: email
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json({
                            message: 'Success',
                            id: user._id
                        });
                        console.log(`${email} logged in successfully`)
                    } else {
                        res.json("Incorrect password");
                    }
                }).catch(err => res.json(err))
        } else {
            res.json("No User Existed")
        }
    }).catch(err => res.json(err))
});



app.listen(3001, () => {
    console.log("Server is Running on post 3001")
});