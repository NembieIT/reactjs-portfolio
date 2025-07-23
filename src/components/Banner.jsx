import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence, spring } from "motion/react"

const Banner = () => {
    return (
        <div className="h-[90dvh] flex items-center justify-center">
            <div className="md:size-[90%] xl:size-[80%] size-full md:flex items-center justify-center">
                <motion.div 
                initial={{opacity:0,x:-200}}
                animate={{opacity:1,x:0}}
                transition={{
                    duration:1,
                    type: "spring",
                    stiffness: 100,
                    damping:20,
                    delay: 0.5,
                }}
                className="md:w-1/2 lg:h-full md:h-1/2 h-auto p-10 md:flex flex-col items-center justify-center">
                    <h2 className="2xl:text-[4rem] text-[50px] font-title font-extrabold text-white">Building Fast Reliable Results</h2>
                    <p className="lg:text-[30px] text-purple-200">I deliver robust, production-ready websites and web apps with speed and precision. Every project is backed by clean code, clear communication, and a commitment to getting it done, on time, every time.</p>
                </motion.div>
                <div className="md:w-1/2 w-[80%] lg:h-full md:h-1/2 h-[30%] rounded-2xl overflow-hidden m-auto border border-white md:border-none">
                    <Spline scene="https://prod.spline.design/OhALQoh7RHDqE-52/scene.splinecode" />
                </div>
            </div>
        </div>
    );
};

export default Banner;