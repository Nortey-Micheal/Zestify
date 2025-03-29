import { InputOTPForm } from "@/components/otp-form";
import { Toaster } from "sonner";

export default function VerifyEmail() {
    return (
        <section className="bg-(--eggshell) w-[100vw] h-[100vh] flex items-center justify-center font-[young-serif] ">
            <Toaster richColors position="top-center"/>
            <InputOTPForm />
        </section>
    )
}