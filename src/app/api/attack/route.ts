// import prisma from "prisma/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { defenseId, tokensUsed } = await req.json();
//   const userId = "authenticated-user-id"; // Replace with authentication middleware logic

//   const defense = await prisma.defense.findUnique({ where: { id: defenseId } });

//   if (!defense) {
//     return NextResponse.json({ error: "Defense not found" }, { status: 404 });
//   }

//   const averageDefenseTokens = defense.tokensUsed || 500; // Default value for simplicity
//   const basePoints = 10;

//   // Increment number of attempts for this user against this defense
//   const previousAttempts = await prisma.attack.count({
//     where: { defenseId, ownerId: userId },
//   });
//   const totalAttempts = previousAttempts + 1;

//   // Calculate score
//   const efficiencyMultiplier = averageDefenseTokens / tokensUsed;
//   const attemptMultiplier = 1 / totalAttempts;
//   const attackScore = Math.round(basePoints * efficiencyMultiplier * attemptMultiplier);

//   // Record the attack and update the user's score
//   await prisma.attack.create({
//     data: {
//       defenseId,
//       tokensUsed,
//       attempts: totalAttempts,
//       ownerId: userId,
//     },
//   });

//   await prisma.teamScore.upsert({
//     where: { userId },
//     update: { points: { increment: attackScore } },
//     create: { userId, points: attackScore },
//   });

//   return NextResponse.json({ score: attackScore });
// }
