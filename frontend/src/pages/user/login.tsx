import LoginForm from "@/components/login-form";
import { Toaster } from "sonner";

export default function Login() {
    return (
        <section className="w-[100vw] h-[100vh] flex justify-center items-center bg-(--eggshell) ">
            <Toaster richColors position="top-center"/>
            <LoginForm />
        </section>
    )
}