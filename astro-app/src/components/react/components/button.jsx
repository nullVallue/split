

export default function Button ({className = "", type = "submit", children, onClick = () => {}, ...props}){


    return(
        <>
            <button
                type={type}
                onClick={onClick}
                className={
                    `
                        rounded
                        py-4
                        cursor-pointer
                    `
                    + className
                }
            >
                {
                    children
                }
            </button>

        </>
    );


}