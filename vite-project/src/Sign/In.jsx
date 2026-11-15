import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function In() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        sessionStorage.removeItem('loggedInUserId');
    }, []);

    const areInputsFilled = () => {
        if (!email && !password) {
            alert('email and password are empty');
            return false;
        }

        if (!email) {
            alert('email is empty');
            return false;
        }

        if (!password) {
            alert('password is empty');
            return false;
        }
        return true;
    }

    const saveToLocalStorage = (id) => {
        sessionStorage.setItem('loggedInUserId', id);
    }

    const handleSignIn = () => {
        if (areInputsFilled()) {
            axios.post('http://localhost:3001/login', {
                email,
                password
            })
                .then(result => {
                    // debugger;
                    console.log(result);
                    if (result.data.message === "Success" && result.data.id) {
                        alert(`Welcome back, ${email}`);
                        saveToLocalStorage(result.data.id);
                        navigate('home');
                    } else {
                        alert(result.data);
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const goToSignUp = () => {
        navigate('signUp');
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 p-4">

            <div className="absolute inset-[-50%] z-0 opacity-65 blur-3xl pointer-events-none animate-diagonal-drift bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 via-purple-700 to-pink-600"></div>

            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div>

            <div className="relative z-10 w-full max-w-md p-10 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-3xl border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-8 overflow-hidden">

                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>

                <div>
                    <h1 className="text-4xl font-black tracking-widest uppercase text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] text-center" style={{ fontFamily: 'monospace, sans-serif' }}>
                        Sign In
                    </h1>
                </div>

                <div className="flex flex-col gap-5">
                    <input
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-purple-300/40 text-sm tracking-wider focus:outline-none focus:border-pink-500/60 focus:ring-4 focus:ring-pink-500/10 transition-all duration-300 shadow-inner"
                        style={{ fontFamily: 'monospace, sans-serif' }}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-purple-300/40 text-sm tracking-wider focus:outline-none focus:border-cyan-500/60 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-300 shadow-inner"
                        style={{ fontFamily: 'monospace, sans-serif' }}
                    />
                </div>

                <div className="flex justify-center w-full">
                    <button
                        onClick={handleSignIn}
                        className="relative px-12 py-4 rounded-xl font-bold tracking-widest uppercase text-white bg-blue-500 transition-all duration-300 active:scale-95"
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
                        Sign In
                    </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-xs tracking-wider text-purple-200/70 pt-2" style={{ fontFamily: 'monospace, sans-serif' }}>
                    <span>Don't have an Account?</span>
                    <button
                        onClick={goToSignUp}
                        className="px-4 py-2 rounded-xl text-pink-400 bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 hover:text-pink-300 font-bold shadow-[0_0_15px_rgba(236,72,153,0.15)] active:scale-95 transition-all duration-300"
                    >
                        Sign Up
                    </button>
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

export default In