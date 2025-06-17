import { Input as ShadInput } from "@/components/ui/input";

export default function Input({className = "", type = "text", ...props}){

    return (
        <>
            <ShadInput
                type={type}
                className={`
                    py-7
                    ` 
                    + className}
                {...props}
            />
        </>
    );

}