"use client"
import Logo from "@/assets/logos/mediastop-high-resolution-logo-transparent.png"
import Image from "next/image"
import Link from "next/link"
import { LINKS_LEFT, LINKS_RIGTH } from "./config"

const NavBar = () => {
    return (
        <nav className="relative flex items-center justify-evenly w-full h-12 bg-black/80">
            <div className="flex items-center">
                {LINKS_LEFT.map((link, index) => (
                    <Link key={index} href={link.url} className="uppercase font-bold hover:text-third transition-colors duration-300">{link.name}</Link>
                ))}
            </div>
            <Image
                src={Logo}
                alt="Logo"
                width={0}
                height={0}
                className="absolute left-1/2 w-20 h-20 z-10"
            />
            <div className="flex items-center">
                {LINKS_RIGTH.map((link, index) => (
                    <Link key={index} href={link.url} className="uppercase font-bold hover:text-third transition-colors duration-300">{link.name}</Link>
                ))}
            </div>
        </nav>
    )
}

export default NavBar
