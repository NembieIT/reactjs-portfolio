import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const About = () => {
    const titleref = useRef(null);
    const contentRef = useRef(null);
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(titleref.current, 
            {y:100, opacity:0},
            {y:0, opacity:1,
                duration:0.8,
                scrollTrigger:{
                    trigger: titleref.current,
                    start: "top 40%",
                    toggleActions: "play none none reverse",
                }
            },
        )

        gsap.fromTo(contentRef.current, 
            {opacity:0, y:100, filter: "blur(10px)"},
            {opacity:1, y:0, filter:"blur(0px)",
                duration:0.8,
                delay: 0.8,
                scrollTrigger: {
                    trigger: titleref.current,
                    start: "top 40%",
                    toggleActions: "play none none reverse",
                },
            }
        )
    }, [])
    return (
        <section id="About" className="lg:h-screen h-auto relative text-white mt-[10%]">
            <div className="text-6xl lg:text-7xl font-title font-bold text-center">
                <h1 ref={titleref}>About Me</h1>
            </div>
            <div ref={contentRef} className="flex lg:flex-row flex-col gap-10 p-10 items-center justify-center mt-[5%]">
                <div className="lg:w-1/2">
                    <p className="lg:text-3xl md:text-4xl text-2xl font-text">Hi! I’m Dũng, a passionate Front-End Developer with strong expertise in building modern, user-centered interfaces. With a solid background in UI/UX design, I focus on creating clean, responsive, and intuitive user experiences that not only look great but also feel seamless to interact with.
I specialize in technologies like React, Tailwind CSS, GSAP, 
and Framer Motion, using animation to bring websites to life and 
enhance user engagement in meaningful ways.</p>
                </div>
                <div className="xl:w-[30%] lg:w-1/2 w-[60%] m-auto rounded-full overflow-hidden">
                    <img src="../../public\474789444_1186399632905464_9184048773564855596_n.jpg" alt="AVT" />
                </div>
            </div>
        </section>
    );
};

export default About;