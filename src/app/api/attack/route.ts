import prisma from "prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/server/auth';

async function getUser(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey) {
    // Get user via API key
    const user = await prisma.user.findUnique({ where: { apiKey } });
    if (user) return user;
  }

  // Fallback to session-based authentication (if available)
  const session = await auth();
  
  if (session) {
    // Simulate session validation (implement your session logic)
    const user = await prisma.user.findUnique({ where: { id: session.user.id }, });
    if (user) return user;
  }

  return null; // No valid user found
}


export async function POST(req: NextRequest) {
  const { defenseId, prompt } = await req.json();
  const user = await getUser(req);

  const defense = await prisma.defense.findUnique({ where: { id: defenseId } });

  if (!defense) {
    return NextResponse.json({ error: "Defense not found" }, { status: 404 });
  }

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Increment number of attempts for this user against this defense
  const previousAttempts = await prisma.attack.count({
    where: { defenseId, ownerId: user.id},
  });

  const totalAttempts = previousAttempts + 1;
  const tokensUsed = prompt.split(/\s+/).length

  // Record the attack and update the user's score
  await prisma.attack.create({
    data: {
      defenseId,
      tokensUsed,
      attempts: totalAttempts,
      ownerId: user.id,
    },
  });

  // Make a call to the LLM to process the attack.
  // TODO: Create helper functions for handling the LLM processing
  const llmResponse = "The LLM is asleep right now. Please try again later. (ERROR: LLM Did not return anything)"

  return NextResponse.json({ response: llmResponse });
}
