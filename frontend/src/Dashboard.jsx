
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Here we would navigate to the actual interview session
            console.log("Starting interview with:", jobDescription);
            alert("Interview Session would start here!");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#EAE7DE] text-[#1A1A1A] flex flex-col relative overflow-hidden">
            <nav className="p-8 flex justify-between items-center z-10">
                <div
                    onClick={() => navigate('/')}
                    className="text-xl font-bold tracking-tighter font-sans uppercase cursor-pointer hover:opacity-60 transition-opacity"
                >
                    Inter/View
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full text-center mb-12"
                >
                    <h1 className="text-6xl md:text-7xl font-serif mb-4">The Context.</h1>
                    <p className="font-sans text-lg opacity-60 uppercase tracking-widest">Paste the job description below to calibrate the AI</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    onSubmit={handleSubmit}
                    className="w-full relative"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Senior Frontend Developer at Google...
Responsibilities:
- Build modern web applications...
Requirements:
- 5+ years of React experience..."
                            className="relative w-full h-[400px] bg-[#F4F1E8] p-8 text-lg font-mono rounded-xl border border-[#D1D1D1] focus:border-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] resize-none transition-all shadow-sm placeholder:opacity-30 placeholder:font-sans"
                            required
                        />
                    </div>

                    <motion.div
                        className="mt-8 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-16 py-5 bg-[#1A1A1A] text-[#EAE7DE] text-xl font-sans font-bold rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-[#EAE7DE] border-t-transparent rounded-full animate-spin"></span>
                                    Initializing...
                                </>
                            ) : (
                                "Begin Simulation"
                            )}
                        </button>
                    </motion.div>
                </motion.form>
            </main>

            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] border border-[#1A1A1A] opacity-[0.03] rounded-full pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] border border-[#1A1A1A] opacity-[0.03] rounded-full pointer-events-none"></div>

        </div>
    );
};

export default Dashboard;
