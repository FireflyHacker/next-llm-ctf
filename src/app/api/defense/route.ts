import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from '@/server/auth';

const prisma = new PrismaClient();

// Function to get user via API key or authentication session
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

export async function GET(req: NextRequest) {
  try {
    const user = await getUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let teamMemberIds = [user.id];

    // Check if the user belongs to a team
    if (user.teamId)
    {
      let teamMembers = await prisma.user.findMany({ where: {teamId: user.teamId}, select: { id: true},});
      teamMemberIds = teamMembers.map((member) => member.id);
    }

    // Retrieve defenses, excluding those created by the user or their team
    const defenses = await prisma.defense.findMany({
      where: {
        NOT: { ownerId: { in: teamMemberIds } }, // Exclude user's or team's defenses
      },
    });

    return NextResponse.json(defenses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch defenses" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, defensePrompt } = body;

    if (!name || !defensePrompt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newDefense = await prisma.defense.create({
      data: { 
        name,
        defensePrompt,
        ownerId: user.id, // Associate the defense with the user
      },
    });

    return NextResponse.json(newDefense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create defense" }, { status: 500 });
  }
}