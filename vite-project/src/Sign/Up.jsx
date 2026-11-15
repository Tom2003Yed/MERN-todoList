import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Up() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');


    const areInputsFilled = () => {
        if (!email && !password) {
            alert('email and password are empty');
            return false;
        }

        if (!email) {
            alert('email is empty');
            return false;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('invalid email...');
            return false;
        }

        if (!password) {
            alert('password is empty');
            return false;
        }

        if (password !== confirmedPassword) {
            alert('passwords not match');
            return false;
        }

        return true;
    }

    const handleSignUp = () => {
        if (areInputsFilled()) {
            axios.post('http://localhost:3001/register', {
                email,
                password
            })
                .then(result => {
                    console.log(result)
                    navigate('/')
                })
                .catch(err => {
                    console.log(err.response.data.error);
                    alert(err.response.data.error);
                })
        }
    }

    const goToSignIn = () => {
        navigate('/')
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] p-4">

            <div className="absolute inset-[-50%] z-0 opacity-70 blur-[100px] pointer-events-none animate-diagonal-drift bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-indigo-950 to-purple-950"></div>

            <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000"></div>

            <div className="relative z-10 w-full max-w-md p-10 rounded-[2rem] bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col gap-8">

                <div>
                    <h1 className="text-4xl font-black tracking-widest uppercase text-cyan-400 text-center drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" style={{ fontFamily: 'monospace, sans-serif' }}>
                        Sign Up
                    </h1>
                </div>

                <div className="flex flex-col gap-5">
                    <input
                        type="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm tracking-wider focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: 'monospace, sans-serif' }}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm tracking-wider focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: 'monospace, sans-serif' }}
                    />
                    <input
                        type="password"
                        placeholder="confirm password"
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm tracking-wider focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: 'monospace, sans-serif' }}
                    />
                </div>

                <div className="flex justify-center w-full">
                    <button
                        onClick={handleSignUp}
                        className="px-12 py-4 rounded-xl font-bold tracking-widest uppercase text-white bg-blue-500 transition-all duration-300 active:scale-95"
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
                        Sign Up
                    </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-xs tracking-wider text-gray-400 pt-2" style={{ fontFamily: 'monospace, sans-serif' }}>
                    <span>Allready have an account?</span>
                    <button
                        onClick={goToSignIn}
                        className="px-4 py-2 rounded-xl text-pink-400 bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 hover:text-pink-300 font-bold shadow-[0_0_15px_rgba(236,72,153,0.15)] active:scale-95 transition-all duration-300"
                    >
                        Sign In
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

export default Up