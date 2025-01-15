import { auth } from '../server/auth';
import Layout from "./layout";


export default async function HomePage() {
  const session = await auth();

  return (
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
  );
}

