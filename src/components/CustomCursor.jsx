import { useEffect, useRef } from "react";
import {gsap} from "gsap";
const CustomCursor = () => {
    const refCursor = useRef(null);
    const refBordercur = useRef(null);
    // hide cursor on mobile
    const ismobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
    if(ismobile){
        return null;
    }
    useEffect(()=>{
        const cursor = refCursor.current;
        const cursorBorder = refBordercur.current;

        // điều chỉnh cursor elements để dot nằm trong border (đồng bộ với nhau)
        gsap.set([cursor, cursorBorder], {
            xPercent: -50,
            yPercent: -50,
        })
        // điều chỉnh tốc độ di chuyển theo Mouse Cursor của cursor elements
        const xTo = gsap.quickTo(cursor, "x", {
            duration: 0.2, ease: "power3.out"
        })
        const yTo = gsap.quickTo(cursor, "y", {
            duration: 0.2, ease: "power3.out"
        })
        const xToBorder = gsap.quickTo(cursorBorder, "x", {
            duration: 0.5, ease: "power3.out"
        })
        const yToBorder = gsap.quickTo(cursorBorder, "y", {
            duration: 0.5, ease: "power3.out"
        })

        // Mouse move
        const handlemouseMove = (e) =>{
            xTo(e.clientX)
            yTo(e.clientY)
            xToBorder(e.clientX)
            yToBorder(e.clientY)
        }

        // Add mouse move listener
        window.addEventListener('mousemove', handlemouseMove)

        // Add mouse click listener
        window.addEventListener('mousedown', ()=>{
            gsap.to([cursor, cursorBorder], {
                scale: 0.6,
                duration: 0.1,
            })
        })
        window.addEventListener('mouseup', ()=>{
            gsap.to([cursor, cursorBorder], {
                scale:1,
                duration:0.1,
            })
        })

    })
    return (
        <>
            <div ref={refCursor} className="fixed top-0 left-0 w-[20px] h-[20px] bg-white rounded-full pointer-events-none z-50 mix-blend-difference"></div>
            <div ref={refBordercur} className="fixed top-0 left-0 w-[40px] h-[40px] border border-white rounded-full pointer-events-none z-50 mix-blend-difference opacity-50"></div>
        </>
    );
};

export default CustomCursor;