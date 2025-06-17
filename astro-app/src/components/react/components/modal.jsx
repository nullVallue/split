import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({onCloseModal = () => {}, children, isOpen = false}){

    const animationDuration = 0.15;


    useEffect(() => {
        const handleEscapeKey = (e) => {
            if(e.key === 'Escape'){
                onCloseModal();
            }
        } 

        document.addEventListener('keydown', handleEscapeKey);

        return() => {
            document.removeEventListener('keydown', handleEscapeKey);
        };

    }, []);

    return(
        <>
            {

                isOpen && (
                    <div
                        onClick={onCloseModal}
                        className="
                            fixed
                            w-screen
                            h-screen
                            bg-neutral-950/30
                            top-0
                            left-0
                            z-40
                            backdrop-blur-sm
                            no-doc-scroll
                        "
                    >
                    </div>

                )
            }
            {
                isOpen && (
                    <div
                        className="
                            w-[90%]
                            bg-black
                            rounded

                            fixed
                            top-1/2
                            left-1/2
                            -translate-x-1/2
                            -translate-y-1/2
                            z-50
                        "
                    >
                        {
                            children
                        }
                        <div
                            className="
                                absolute
                                top-5
                                right-5
                                cursor-pointer
                            "
                            onClick={onCloseModal}
                        >
                            <X />
                        </div>
                    </div>
                )
            }



        </>
    );

}