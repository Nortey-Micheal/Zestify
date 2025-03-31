import SignupForm from "@/components/signup-form";
import { Toaster } from "sonner";

export default function Signup() {
    return (
        <section className="w-[100vw] min-h-[100vh] py-5 flex justify-center items-center bg-(--eggshell) ">
            <Toaster richColors position="top-center"/>
            <SignupForm />
        </section>
    )
}