import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

function Create() {

    const [task, setTask] = useState('');

    const handleAdd = () => {
        if (task.length != 0) {
            const id = sessionStorage.getItem('loggedInUserId');
            axios.post(`http://localhost:3001/add/${id}`, {
                task: task
            })
                .then(result => {
                    location.reload();
                })
                .catch(err => {
                    console.log('Server error:', err.response?.data?.error || err);
                })
        } else {
            alert('Input is Empty!');
        }
    }

    return (
        <div className="flex justify-center gap-3">
            <input
                type="text"
                placeholder='Enter Task'
                onChange={(e) => setTask(e.target.value)}
                className="px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm tracking-wider focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: 'monospace, sans-serif' }}
            />
            <button
                onClick={handleAdd}
                className="px-6 py-3 text-white font-bold tracking-widest uppercase rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
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
                Add
            </button>
        </div>
    )
}

export default Create