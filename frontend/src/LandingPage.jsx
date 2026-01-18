
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();

    // Parallax effects
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const rotateShape = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div className="min-h-screen bg-[#EAE7DE] text-[#1A1A1A] overflow-hidden relative">
            <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference text-[#EAE7DE]">
                <div className="text-xl font-bold tracking-tighter font-sans uppercase">Inter/View</div>
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center">
                    <span className="mb-1">=</span>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
                <motion.div
                    className="absolute z-10 text-center mix-blend-exclusion text-[#EAE7DE]" // Ensuring text is visible over the shape
                    style={{ y: yHero }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[12vw] leading-[0.85] font-serif tracking-tight"
                    >
                        the <span className="italic font-light">ART</span> <br />
                        of <span className="font-sans font-bold tracking-tighter">TALK</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-8 text-lg font-sans uppercase tracking-widest opacity-60 max-w-md mx-auto"
                    >
                        AI-Driven Interview Simulation
                    </motion.p>
                </motion.div>

                {/* Abstract Shape */}
                <motion.div
                    style={{ rotate: rotateShape }}
                    className="absolute w-[60vh] h-[60vh] rounded-full border-[1px] border-[#1A1A1A] opacity-20 pointer-events-none"
                >
                    <div className="w-full h-full rounded-full border-[1px] border-[#1A1A1A] absolute top-1 left-1" />
                    <div className="w-full h-full rounded-full border-[1px] border-[#1A1A1A] absolute top-2 left-2" />
                    <div className="w-full h-full rounded-full border-[1px] border-[#1A1A1A] absolute top-3 left-3 transform rotate-45" />
                    <div className="w-full h-full rounded-full border-[1px] border-[#1A1A1A] absolute -top-4 -left-4 transform -rotate-12" />
                    {/* Inner solid circle for contrast */}
                    <div className="absolute inset-20 bg-[#1A1A1A] rounded-full blur-[80px] opacity-10"></div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 right-10 flex flex-col items-center gap-2"
                >
                    <div className="h-20 w-[1px] bg-[#1A1A1A]"></div>
                </motion.div>

            </section>

            {/* Feature Section 1: Voice */}
            <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-[6rem] font-serif leading-none">
                            Real <br />
                            <span className="italic pl-20">Human</span> <br />
                            Voice.
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-xl font-sans leading-relaxed opacity-80"
                    >
                        <p>Experience an interview that speaks back. Our advanced AI voice synthesis creates a natural, conversational environment that mimics real-world interactions.</p>
                        <p className="mt-6 text-sm uppercase tracking-widest border-b border-black pb-2 inline-block">Hear the difference</p>
                    </motion.div>
                </div>
            </section>

            {/* Feature Section 2: Scoring */}
            <section className="min-h-screen bg-[#1A1A1A] text-[#EAE7DE] flex items-center justify-center px-4 py-20">
                <div className="max-w-6xl w-full flex flex-col items-end text-right">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-[6rem] font-serif leading-none mb-10">
                            Precise <br />
                            <span className="italic font-thin text-[#EAE7DE]/50">Scoring</span>.
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-xl text-xl font-sans leading-relaxed opacity-80"
                    >
                        <p>Get instant, granular feedback on your performance. We analyze every response to give you a competitive edge.</p>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/dashboard')}
                        className="mt-20 px-12 py-6 bg-[#EAE7DE] text-[#1A1A1A] text-xl font-sans font-bold rounded-full hover:bg-white transition-colors"
                    >
                        Start Interview
                    </motion.button>
                </div>
            </section>

        </div>
    );
};

export default LandingPage;
