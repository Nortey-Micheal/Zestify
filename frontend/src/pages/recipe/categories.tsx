import Navbar from "@/components/navbar";
import { NavbarSmallScreen } from "@/components/navbarSmallScreen";

export default function RecipeCategoryPage() {
    return (
        <section className="lg:h-[100vh] lg:py-5 ">
            <Navbar />
            <NavbarSmallScreen />
        </section>
    )
}