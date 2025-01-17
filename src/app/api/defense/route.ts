import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
  try {
    const defenses = await prisma.defensePrompt.findMany();
    return NextResponse.json(defenses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch defenses" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, defensePrompt, pythonGuardrails, postPromptLogic } = body;

    if (!name || !defensePrompt || !pythonGuardrails || !postPromptLogic) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newDefense = await prisma.defensePrompt.create({
      data: { 
        name: name,
        order: 1,
        team: 
        prompt: defensePrompt
     },
    });

    return NextResponse.json(newDefense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create defense" }, { status: 500 });
  }
}
