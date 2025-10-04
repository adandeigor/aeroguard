// components/Header.tsx
"use client"; // On passe client car menu interactif – si tu veux pure server, on peut fallback à un <nav> statique

import Link from "next/link";
import { Button } from "@/components/ui/button"; // Shadcn Button
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"; // Shadcn Drawer pour mobile
import { Menu, X, Search } from "lucide-react"; // Icônes Lucide (npm i lucide-react si pas installé)
import { useState } from "react"; // Pour toggle menu (client-side ici pour interraction)
import { CountryCityAlertDialog } from "@/components/sections/CountryCityAlertDialog";
import MascotScene from "../sections/MascotScene";

interface NavLink {
    label: string;
    href: string;
}

const navLinks: NavLink[] = [
    { label: "Home", href: "#hero" },
    { label: "Globe", href: "#globe" },
    { label: "Graphiques", href: "#graphiques" },
    { label: "Previsions", href: "#previsions" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full p-4 bg-sky-50/80 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-sky-200/50">
            {/* Logo/Title – center on mobile, right on desktop */}
            <div className="flex items-center justify-between">
                <h1 className="font-rosnoc text-xl md:text-4xl text-sky-950 font-bold">
                    <Link href="/">aeroguard</Link>{" "}
                    {/* Lien pour scroll smooth */}
                </h1>

                {/* Menu Desktop : Horizontal */}
                <div className="flex items-center">
                    <nav className="hidden md:flex space-x-6">
                        {navLinks.map((link) => (
                            <Button
                                key={link.href}
                                asChild
                                variant="ghost"
                                className="text-sky-800 hover:text-sky-600 hover:bg-sky-100 transition-colors"
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </Button>
                        ))}
                    </nav>

                    {/* Menu Mobile : Drawer with Burger */}
                    <Drawer open={isOpen} onOpenChange={setIsOpen}>
                        <DrawerTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                            >
                                <Menu className="h-6 w-6 text-sky-800" />
                                <span className="sr-only">Open the menu</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="bg-sky-50/90 backdrop-blur-sm">
                            <DrawerTitle>
                                <span className="sr-only">Navigation menu</span>
                            </DrawerTitle>
                            <div className="flex items-center justify-between p-4 border-b border-sky-200">
                                <h1 className="font-rosnoc text-2xl text-sky-950">
                                    AEROGUARD
                                </h1>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="md:hidden"
                                >
                                    <X className="h-6 w-6 text-sky-800" />
                                    <span className="sr-only">
                                        Close the mobile menu
                                    </span>
                                </Button>
                            </div>
                            <div className="p-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Button
                                        key={link.href}
                                        asChild
                                        variant="ghost"
                                        className="w-full justify-start text-sky-800 hover:text-sky-600 hover:bg-sky-100"
                                        onClick={() => setIsOpen(false)} // Ferme au clic
                                    >
                                        <Link href={link.href}>
                                            {link.label}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </DrawerContent>
                    </Drawer>

                    <CountryCityAlertDialog />
                </div>
            </div>
        </header>
    );
}
