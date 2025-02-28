"use client";

import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
    const { data: session } = useSession()
    return (
        <nav className="bg-blue-800 p-4">
            <ul className="flex justify-evenly text-md font-mono text-white">
                <li><Link href="/">Home</Link></li>
                {
                    session ? (
                        <li><Link href="/api/auth/signout">logout</Link></li>
                    ) :
                        <>
                            <li><Link href="/sign-up">Sign Up</Link></li>
                            <li><Link href="/login">Login</Link></li>
                        </>
                }
            </ul>
        </nav>
    )
}

