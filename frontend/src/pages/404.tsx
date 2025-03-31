import { Link } from "react-router";

export default function AppNoPageFound() {
    return (
        <section className="h-[100vh] w-[100vw] flex justify-center items-center ">
            <div className="text-center">
                <h1 className="text-8xl font-extrabold text-slate-700 font-serif">ERROR 404</h1>
                <p className="text-4xl font-bold text-slate-500 font-serif">NO PAGE FOUND</p>
                <p className="text-2xl font-bold text-slate-500 font-serif">Return to <Link className="hover:underline text-blue-800" to={'/'}>Home</Link></p>
            </div>
        </section>
    )
}