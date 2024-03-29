import NavBar from "@/components/navbar/NavBar"
import SubNavbar from "@/components/subNavbar/SubNavbar"

const layout = ({ children }: { children: React.ReactElement }) => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-primary to-secondary text-white">
            <NavBar />
            <SubNavbar />
            <div className="p-5 w-full h-full">
                {children}
            </div>

        </main>
    )
}

export default layout
