import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [userEmail, setUserEmail] = useState('');
    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.removeItem('loggedInUserId');
        navigate('/');
    }

    const handleSignOut = () => {
        const userId = sessionStorage.getItem('loggedInUserId');
        axios.delete(`http://localhost:3001/deleteUser/${userId}`)
            .then(result => {
                console.log(result.data.email, 'has been deleted!');
                sessionStorage.removeItem('loggedInUserId');
                navigate('/');
                alert('User has been deleted!');
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const id = sessionStorage.getItem('loggedInUserId')
        if (id) {
            axios.get(`http://localhost:3001/getUser/${id}`)
                .then(result => {
                    setTodos(result.data.list);
                    setUserEmail(result.data.email);
                })
                .catch(err => {
                    console.log(err);
                    sessionStorage.removeItem('loggedInUserId');
                    navigate('/');
                })
        }
    }, [])

    const handleEdit = (taskId) => {
        const userId = sessionStorage.getItem('loggedInUserId');
        axios.put(`http://localhost:3001/update/${userId}/${taskId}`)
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (taskId) => {
        const userId = sessionStorage.getItem('loggedInUserId');
        axios.delete(`http://localhost:3001/deleteTask/${userId}/${taskId}`)
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] p-4">

            <div className="absolute inset-[-50%] z-0 opacity-70 blur-[100px] pointer-events-none animate-diagonal-drift bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-indigo-950 to-purple-950"></div>

            <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000"></div>

            <div className="absolute top-6 left-6 z-20">
                <button
                    onClick={handleLogOut}
                    className="px-5 py-2 text-white font-bold tracking-widest uppercase rounded-xl transition-all duration-300 active:scale-95"
                    style={{
                        fontFamily: 'monospace, sans-serif',
                        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.9), rgba(37, 99, 235, 0.9))',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(0, 0, 0, 0.4), 0 0 25px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(255, 255, 255, 1), inset 0 -2px 6px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.9), 0 0 90px rgba(59, 130, 246, 0.6), 0 0 140px rgba(37, 99, 235, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(0, 0, 0, 0.4), 0 0 25px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)';
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(255, 255, 255, 1), inset 0 -3px 8px rgba(0, 0, 0, 0.6), 0 0 60px rgba(59, 130, 246, 1), 0 0 120px rgba(59, 130, 246, 0.8), 0 0 200px rgba(37, 99, 235, 0.5)';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(255, 255, 255, 1), inset 0 -2px 6px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.9), 0 0 90px rgba(59, 130, 246, 0.6), 0 0 140px rgba(37, 99, 235, 0.3)';
                    }}
                >
                    Log Out
                </button>
            </div>
            <div className="absolute top-18 left-6 z-20">
                <button
                    onClick={handleSignOut}
                    className="px-5 py-2 text-white font-bold tracking-widest uppercase rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
                    style={{
                        fontFamily: 'monospace, sans-serif',
                        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.9), rgba(225, 29, 72, 0.9))',
                        boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(0, 0, 0, 0.4), 0 0 25px rgba(244, 63, 94, 0.6), 0 0 60px rgba(225, 29, 72, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(255, 255, 255, 1), inset 0 -2px 6px rgba(0, 0, 0, 0.5), 0 0 40px rgba(244, 63, 94, 0.9), 0 0 90px rgba(244, 63, 94, 0.6), 0 0 140px rgba(225, 29, 72, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(0, 0, 0, 0.4), 0 0 25px rgba(244, 63, 94, 0.6), 0 0 60px rgba(225, 29, 72, 0.3)';
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(255, 255, 255, 1), inset 0 -3px 8px rgba(0, 0, 0, 0.6), 0 0 60px rgba(244, 63, 94, 1), 0 0 120px rgba(244, 63, 94, 0.8), 0 0 200px rgba(225, 29, 72, 0.5)';
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(255, 255, 255, 1), inset 0 -2px 6px rgba(0, 0, 0, 0.5), 0 0 40px rgba(244, 63, 94, 0.9), 0 0 90px rgba(244, 63, 94, 0.6), 0 0 140px rgba(225, 29, 72, 0.3)';
                    }}
                >
                    Sign Out
                </button>
            </div>

            <div className="relative z-10 w-full max-w-md p-8 rounded-[2rem] bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col gap-6">
                <div>
                    <h2 className="text-3xl font-black tracking-widest uppercase text-cyan-400 text-center mb-2 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" style={{ fontFamily: 'monospace, sans-serif' }}>
                        Todo List
                    </h2>
                    <h3 className="text-sm font-bold text-purple-200/80 text-center tracking-wider" style={{ fontFamily: 'monospace, sans-serif' }}>
                        Welcome back, {userEmail}
                    </h3>
                </div>

                <div className="text-white">
                    <Create />
                </div>

                <div className="mt-2 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                    {todos.length === 0 ? (
                        <div className="text-center py-8 text-gray-400" style={{ fontFamily: 'monospace, sans-serif' }}>
                            <h2 className="text-lg font-medium tracking-wider">No Record</h2>
                        </div>
                    ) : (
                        todos.map((todo, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40"
                            >
                                <div
                                    onClick={() => handleEdit(todo._id)}
                                    className="cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                                >
                                    <p className={`font-medium tracking-wide transition-all duration-200 ${todo.done ? 'text-green-400 line-through drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]' : 'text-white'}`} style={{ fontFamily: 'monospace, sans-serif' }}>
                                        {todo.task}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleDelete(todo._id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase text-pink-400 bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 hover:text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.15)] active:scale-95 transition-all duration-300 cursor-pointer"
                                        style={{ fontFamily: 'monospace, sans-serif' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style>{`
        @keyframes diagonalDrift {
            0% {
                transform: translate(0%, 0%);
            }
            50% {
                transform: translate(15%, 15%);
            }
            100% {
                transform: translate(0%, 0%);
            }
        }
        .animate-diagonal-drift {
            animation: diagonalDrift 18s ease-in-out infinite;
        }
    `}</style>
        </div>
    )
}

export default Home