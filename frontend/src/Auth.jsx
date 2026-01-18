import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup 
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate('/dashboard'); // Redirect to dashboard on success
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#EAE7DE] text-[#1A1A1A] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div onClick={() => navigate('/')} className="cursor-pointer mb-6 inline-block">
                         <div className="text-xl font-bold tracking-tighter font-sans uppercase">Inter/View</div>
                    </div>
                    
                    <h1 className="text-5xl font-serif mb-2">
                        {isLogin ? 'Welcome Back.' : 'Join Us.'}
                    </h1>
                    <p className="font-sans text-sm uppercase tracking-widest opacity-60">
                        {isLogin ? 'Continue your journey' : 'Start your preparation'}
                    </p>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#1A1A1A] py-3 px-1 text-lg font-sans placeholder:text-[#1A1A1A]/40 focus:outline-none focus:border-opacity-100 border-opacity-20 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#1A1A1A] py-3 px-1 text-lg font-sans placeholder:text-[#1A1A1A]/40 focus:outline-none focus:border-opacity-100 border-opacity-20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-800 text-sm font-sans"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#1A1A1A] text-[#EAE7DE] py-4 rounded-none hover:bg-opacity-90 transition-all duration-300 font-sans uppercase tracking-widest text-sm"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-4">
                        <div className="h-[1px] bg-[#1A1A1A] opacity-10 flex-1"></div>
                        <span className="font-sans text-xs uppercase opacity-40">Or</span>
                        <div className="h-[1px] bg-[#1A1A1A] opacity-10 flex-1"></div>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="mt-6 w-full border border-[#1A1A1A] py-4 flex items-center justify-center gap-3 hover:bg-[#1A1A1A] hover:text-[#EAE7DE] transition-all duration-300 group"
                    >
                         <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span className="font-sans text-sm uppercase tracking-widest">Continue with Google</span>
                    </button>

                    <div className="mt-8 text-center">
                        <p className="font-sans text-sm opacity-60">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button 
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 font-bold underline decoration-1 underline-offset-4 hover:opacity-80"
                            >
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default Auth;
