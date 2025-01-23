import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";
import { v4 as uuidv4 } from "uuid";
import { auth } from '@/server/auth';

const MAX_API_KEY_ACTIONS = parseInt(process.env.MAX_API_KEY_ACTIONS ?? '') ?? 3; // Default to 3 actions per day

/**
 * Get the API key for the authenticated user
 */

export async function GET(req: NextRequest) {
  // Authenticate the user
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find the user in the database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Return the API key if it exists
  if (user.apiKey) {
    return NextResponse.json({ apiKey: user.apiKey });
  } else {
    return NextResponse.json({ error: "No API key found" }, { status: 404 });
  }
}

/**
 * Generate a new API key for the authenticated user
 */
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check the user's API key actions for the day
  const today = new Date().toISOString()
  const apiKeyActionsToday = await prisma.auditLog.count({
    where: {
      userId: user.id,
      action: "API_KEY_GENERATED",
      createdAt: {
        gte: today,
      },
    },
  });

  if (apiKeyActionsToday >= MAX_API_KEY_ACTIONS) {
    return NextResponse.json({ error: "API key generation limit reached" }, { status: 429 });
  }

  // Generate a new API key and store it in the database
  const newApiKey = uuidv4();

  await prisma.user.update({
    where: { id: user.id },
    data: { apiKey: newApiKey },
  });

  // Log the action
  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "API_KEY_GENERATED",
      details: `Generated new API key`,
    },
  });

  return NextResponse.json({ apiKey: newApiKey });
}

/**
 * Revoke the API key for the authenticated user
 */
export async function DELETE(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id},
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check the user's API key actions for the day
  const today = new Date().toISOString()
  const apiKeyActionsToday = await prisma.auditLog.count({
    where: {
      userId: user.id,
      action: "API_KEY_REVOKED",
      createdAt: {
        gte: today,
      },
    },
  });

  if (apiKeyActionsToday >= MAX_API_KEY_ACTIONS) {
    return NextResponse.json({ error: "API key revocation limit reached" }, { status: 429 });
  }

  // Revoke the API key
  await prisma.user.update({
    where: { id: user.id },
    data: { apiKey: null },
  });

  // Log the action
  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "API_KEY_REVOKED",
      details: `Revoked API key`,
    },
  });

  return NextResponse.json({ message: "API key revoked" });
}
