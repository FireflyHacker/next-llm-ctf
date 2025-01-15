import Link from "next/link";
import Image from "next/image";
import { auth } from '../server/auth';

export default async function Navbar() {
    const session = await auth();

  return (
    <header className="bg-blue-600 text-white py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        
        {/* Left Side: Logo */}
        <h1 className="text-xl font-bold flex items-center space-x-4">
        <Image
            src="/favicon.ico"
            alt="Logo"
            width={35} // Adjust size as needed
            height={35}
          />
        <Link href="/">Next-LLM-CTF</Link>
        </h1>

        {/* Center: Navigation Links */}
        <nav className="flex space-x-6">
          <Link href="/defense" className="hover:underline">
            Defense
          </Link>
          <Link href="/attack" className="hover:underline">
            Attack
          </Link>
          <Link href="/challenges" className="hover:underline">
            Challenges
          </Link>
          <Link href="/scoreboard" className="hover:underline">
            Scoreboard
          </Link>
          <Link href="/rules" className="hover:underline">
            Rules
          </Link>
          <Link href="/docs" className="hover:underline">
            Docs/Help
          </Link>
        </nav>


      <div>
        {session ? (
            <div className="flex items-center space-x-4">
                <Link
                    href="/account"
                    className="font-medium hover:underline flex items-center space-x-2"
                >
                <span>{session.user?.name ?? session.user?.email}</span>
                </Link>
                <Link href="/api/auth/signout"
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg transition">
                Logout
                </Link>
            </div>
        ) : (
          <Link
            href="/api/auth/signin"
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-lg transition"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  </header>
  );
}
