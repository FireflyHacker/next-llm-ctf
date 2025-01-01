import Link from "next/link";
import { auth, signIn, signOut } from '../server/auth';


export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-xl font-bold">Next-LLM-CTF</h1>
          <div>
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="font-medium">Welcome, {session.user.name ?? session.user.email}!</span>
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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Welcome to Next-LLM-CTF</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Next-LLM-CTF is an advanced platform for hosting **Capture The Flag (CTF)** competitions
            centered around **Large Language Models (LLMs)**. This project enables participants to
            design and test their own attack and defense strategies using dynamic workflows and
            real-world techniques.
          </p>
          <ul className="list-disc pl-6 text-gray-700 text-lg mb-6">
            <li>Develop defensive workflows using Python and prompt engineering.</li>
            <li>Test your strategies against simulated attacks in a controlled environment.</li>
            <li>Collaborate with your team to optimize defenses and score points.</li>
          </ul>
          <p className="text-gray-700 text-lg leading-relaxed">
            Ready to get started? <strong>Sign in</strong> to create your first defense or explore
            existing ones.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-4">
        <div className="max-w-7xl mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Next-LLM-CTF. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

