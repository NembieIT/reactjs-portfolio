import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tr } from "motion/react-client";
import { number } from "motion";

const projects = [
    { title: 'Portfolio Website', image: '../../public/banner.png' },
    { title: 'E-commerce App', image: '../../public/banner.png' },
    { title: 'Blog Platform', image: '../../public/banner.png' },
    { title: 'Admin Dashboard', image: '../../public/banner.png' },
    { title: 'Weather App', image: '../../public/banner.png' },
];
const ProjectSection = () => {
    gsap.registerPlugin(ScrollTrigger);
    const projContRef = useRef(null);

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const lineRef = useRef(null);

    const scrollRef = useRef(null);
    const triggerRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(titleRef.current,
            { opacity: 0, y: -400 },
            {
                opacity: 1, y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    toggleActions: "play none none reverse",
                }
            }
        )

        gsap.fromTo(lineRef.current,
            { width: 0 },
            {
                width: "100%",
                duration: 1,
                delay: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    toggleActions: "play none none reverse",
                }
            }
        )

        gsap.fromTo(scrollRef.current,
            { opacity: 0, scale: 0.3 },
            {
                opacity: 1, scale: 1,
                duration: 1,
                delay: 1,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    toggleActions: "play none none reverse",
                }
            }
        )
    }, [])

    let translateX=0;
    let index=1;
    function scroll(status) {
        const numberTrans = projects.length;
        let valueTrans = 100;
        if(!status){
            valueTrans=-100;
        }
        if (status && index < numberTrans) {
            translateX -= valueTrans;
            gsap.to(scrollRef.current, {
                x: `${translateX}vw`,
                duration: 0.7,
                ease: "power2.out"
            });
            index++;
        } else if (!status && index!=1) {
            translateX-=valueTrans;
            gsap.to(scrollRef.current, {
                x: `${translateX}vw`,
                duration: 0.7,
                ease : "power2.out"
            })
            index--;
        }else if(status && index==numberTrans){
            index=1;
            translateX=0;
            gsap.to(scrollRef.current, {
                x: `${translateX}vw`,
                duration: 0.5,
                ease : "power2.out"
            })
        }else if(!status && index==1){
            index=numberTrans;
            translateX=-((numberTrans-1)*100);
            gsap.to(scrollRef.current, {
                x: `${translateX}vw`,
                duration: 0.5,
                ease : "power2.out"
            })
        }
    }
    return (
        <div ref={projContRef} id="Projects" className={`relative h-screen w-screen bg-gradient-to-r from-violet-600 to-pink-500`}>
            <div className="absolute top-0 w-full h-[2px] bg-white" />
            <div ref={sectionRef} className="relative w-[50%] h-[20%] m-auto text-center font-text font-bold text-white p-10">
                <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl opacity-0">My Projects</h1>
                <div ref={lineRef} className="absolute bottom-0 left-0 w-0 h-[7px] bg-gradient-to-r from-pink-500 to-violet-600 rounded-full"></div>
            </div>
            <div ref={triggerRef} className="h-[80%]">
                <div ref={scrollRef} className="relative w-auto h-full flex items-center">
                    {projects.map((item, index) => {
                        return (
                            <div key={index} className="Card min-w-full w-full h-full">
                                <div className="min-w-full m-auto h-full flex flex-col gap-y-15 items-center p-10">
                                    <img className="project-image w-[60%]" src={item.image} alt="Banner" />
                                    <h2 className="project-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-text font-bold text-white uppercase">{item.title} <span className="group"><i className="group-hover:scale-120 fa-solid fa-up-right-from-square"></i></span></h2>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div onClick={()=> scroll(true)} className="absolute bottom-40 md:top-1/2 text-5xl lg:text-7xl text-white right-10"><i className="fa-solid fa-forward"></i></div>
            <div onClick={()=> scroll(false)} className="absolute bottom-40 md:top-1/2 text-5xl lg:text-7xl text-white left-10"><i className="fa-solid fa-backward"></i></div>
        </div>
    );
};

export default ProjectSection;