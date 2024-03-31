import NavBar from "@/components/navbar/NavBar"
import SubNavbar from "@/components/subNavbar/SubNavbar"
import Providers from "./Providers";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const layout = ({ children }: { children: React.ReactElement }) => {
    return (

        <Providers>
            <main className="min-h-screen bg-gradient-to-b from-primary to-secondary text-white">
                <NavBar />
                <SubNavbar />
                <div className="p-5 w-full h-full">
                    {children}
                </div>
            </main>
        </Providers>

    )
}

export default layout
