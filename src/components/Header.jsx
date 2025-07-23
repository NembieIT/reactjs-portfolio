import { motion, AnimatePresence, spring } from "motion/react"
import { useState } from "react";

const Header = () => {
    function reloadPage() {
        window.location.reload();
    }
    const [Opennav, setOpennav] = useState(false);
    const [OpenContact, setOpenContact] = useState(false);
    const handleOpenNav = () => { setOpennav(!Opennav) }
    const handleOpenContact = () => { setOpenContact(!OpenContact); 
        setTimeout(()=>{
            handleValidForm(); 
        }, 0);
    };

    function handleValidForm() {
        Validator({
            form: '#formContact',
            formGroup: '.form-group',
            formMessage: '.form-message',
            rules: [
                Validator.isRequired('#name', "Please fill the form !"),
                Validator.isRequired('#email', "Please fill the form !"),
                Validator.isRequired('#content', "Please fill the form !"),
                Validator.isEmail('#email', "Email is not correct !"),
            ],
            onSubmit: function (data) {
                console.log(data);
            }
        });
    }

    return (
        <div className="relative min-h-[10dvh] h-[10dvh] w-full font-text lg:text-2xl text-[20px]">
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
                onClick={handleOpenNav}
                className="fixed z-20 top-[10%] md:top-[10%] left-0 text-7xl -rotate-90 lg:hidden group">
                <i className="text-white fa-solid fa-caret-down group-hover:text-purple-600 "></i>
            </motion.div>
            <AnimatePresence>
                {Opennav && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{
                            type: "spring",
                            duration: 0.5,
                        }}
                        className="fixed z-20 w-[80%] left-[10%] top-[10%] text-center p-5 flex flex-col gap-10 bg-gray-500/90 rounded-[10px] border-2">
                        {["Home", "About", "Projects", "Experience", "Contact"].map((item, index) => {
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20,
                                        delay: 0.1 + index * 0.2,
                                    }}
                                    key={item} className="relative group w-fit m-auto">
                                    <a className="group-hover:text-purple-800 transition-all ease-in-out duration-400 font-medium text-4xl" href={`#${item}`}>{item}</a>
                                    <span className="absolute h-[5%] w-0 left-0 bottom-0 bg-purple-800 group-hover:w-full transition-all ease-in-out duration-400"></span>
                                </motion.div>
                            )
                        })}
                        <div className="flex items-center justify-center gap-x-20 text-4xl">
                            <a href="#"><i className="fa-brands fa-square-github hover:text-white transition-all ease-in-out 0.4s"></i></a>
                            <a href="#"><i className="fa-solid fa-envelope hover:text-white transition-all ease-in-out 0.4s"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin hover:text-white transition-all ease-in-out 0.4s"></i></a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {OpenContact && (
                    <div className="fixed z-10 inset-0 p-10 flex items-center justify-center bg-black/50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{
                                type: "spring",
                                duration: 0.5,
                                stiffness: 100,
                                damping: 20
                            }}
                            className="xl:w-[40%] lg:w-[50%] md:w-[60%] w-[100%] p-[5%] xl:p-[2%] bg-gray-700 rounded-2xl text-white text-3xl md:text-4xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-1xl md:text-6xl">Contact Me</h2>
                                <i onClick={handleOpenContact} className=" fa-solid fa-xmark hover:scale-130"></i>
                            </div>
                            <form id="formContact" className="flex flex-col gap-y-5 mt-3">
                                <div className="form-group">
                                    <label htmlFor="name">Email : </label> <br />
                                    <input className="bg-white rounded-[5px] w-full" name="email" type="text" id="email" />
                                    <span className="text-red-600 form-message"></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name : </label> <br />
                                    <input className="bg-white rounded-[5px] w-full" name="name" type="text" id="name" />
                                    <span className="text-red-600 form-message"></span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Text : </label> <br />
                                    <input className="bg-white rounded-[5px] w-full" name="content" type="text" id="content" />
                                    <span className="text-red-600 form-message"></span>
                                </div>
                                <button className=" w-auto m-auto border rounded-2xl p-2 md:p-3 hover:bg-purple-500 transition-all duration-300 ease-in-out">Contact</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            <div className="h-full lg:w-[95%] xl:w-[80%] w-full m-auto lg:px-3 xl:px-10 px-2 flex items-center justify-between">
                <div className="h-full flex items-center justify-center gap-5">
                    <img onClick={reloadPage} className="lg:size-[90%] size-[70%] bg-white rounded-full " src="../../public\avatar1.png" alt="LOGO" />
                    <h1 className="md:text-[30px]">NembieIT</h1>
                </div>
                <div className="lg:flex items-center justify-center lg:gap-10 hidden">
                    {["Home", "About", "Projects", "Experience", "Contact"].map((item, index) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                    delay: 0.7 + index * 0.2,
                                }}
                                key={item} className="relative group">
                                <a className="group-hover:text-purple-300 transition-all ease-in-out duration-400 font-medium" href={`#${item}`}>{item}</a>
                                <span className="absolute h-[5%] w-0 left-0 bottom-0 bg-purple-600 group-hover:w-full transition-all ease-in-out duration-400"></span>
                            </motion.div>
                        )
                    })}
                </div>
                <div className="flex items-center justify-center gap-5 md:text-[30px]">
                    <a className="hidden lg:inline-block" href="#"><i className="fa-brands fa-square-github hover:text-white transition-all ease-in-out 0.4s"></i></a>
                    <a className="hidden lg:inline-block" href="#"><i className="fa-solid fa-envelope hover:text-white transition-all ease-in-out 0.4s"></i></a>
                    <a className="hidden lg:inline-block" href="#"><i className="fa-brands fa-linkedin hover:text-white transition-all ease-in-out 0.4s"></i></a>
                    <motion.button
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            delay: 0.7,
                        }}
                        onClick={handleOpenContact}
                        className=" bg-white p-2 rounded-2xl hover:bg-purple-500 hover:text-white transition-all ease-in-out 0.6s">Hire Me</motion.button>
                </div>
            </div>
        </div>
    );
};

export default Header;