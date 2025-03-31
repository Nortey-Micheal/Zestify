import SignupForm from "@/components/signup-form";
import { Toaster } from "sonner";

export default function Signup() {
    return (
        <section className="w-[100vw] h-[100vh] flex justify-center items-center bg-(--eggshell) ">
            <Toaster richColors position="top-center"/>
            <SignupForm />
        </section>
    )
}