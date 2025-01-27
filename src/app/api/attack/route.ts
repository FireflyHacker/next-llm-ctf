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

  const averageDefenseTokens = defense.tokensUsed || 500; // Default value for simplicity
  const basePoints = 10;

  // Increment number of attempts for this user against this defense
  const previousAttempts = await prisma.attack.count({
    where: { defenseId, ownerId: user.id},
  });

  const totalAttempts = previousAttempts + 1;
  const tokensUsed = prompt.split(/\s+/).length

  // Calculate score
  const efficiencyMultiplier = averageDefenseTokens / tokensUsed;
  const attemptMultiplier = 1 / totalAttempts;
  const attackScore = Math.round(basePoints * efficiencyMultiplier * attemptMultiplier);

  // Record the attack and update the user's score
  await prisma.attack.create({
    data: {
      defenseId,
      tokensUsed,
      attempts: totalAttempts,
      ownerId: user.id,
    },
  });

  if (user.teamId)
  {
    // Check if a TeamScore exists for the user in the competition
    let teamScore = await prisma.teamScore.findFirst({
      where: {
        teamId: user.teamId,
      },
    });
  } else {
    // Create a new UserScore entry if it doesn't exist
    let teamScore = await prisma.teamScore.create({
      data: {
        userId: user.id,
        teamId: user.teamId || null, // Associate with the user's team if they have one
      },
    });
  }

  // Add a new Point to the TeamScore
  await prisma.point.create({
    data: {
      reason: `Successful attack against Defense ID: ${defenseId}`,
      awardedBy: user.id, // The ID of the user who made the attack
      teamScoreId: teamScore.id,
      amount: attackScore,
      penalty: false, // Indicate it's a positive score
    },
  });

  return NextResponse.json({ score: attackScore });
}
