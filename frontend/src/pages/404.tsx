import { Link } from "react-router";

export default function AppNoPageFound() {
    return (
        <section className="h-[100vh] w-[100vw] font-[young-serif] flex justify-center items-center ">
            <div className="text-center">
                <h1 className="text-8xl font-extrabold text-slate-700 mb-3">ERROR 404</h1>
                <p className="text-4xl font-bold text-slate-500 ">NO PAGE FOUND</p>
                <p className="text-2xl font-bold text-slate-500 ">Return to <Link className="hover:underline text-blue-800" to={'/'}>Home</Link></p>
            </div>
        </section>
    )
}