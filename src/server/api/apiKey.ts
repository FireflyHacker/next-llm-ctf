import prisma from "prisma/prisma";
/**
 * Validate an API key and fetch the associated user
 * @param apiKey - The API key to validate
 * @returns The user associated with the API key, or null if invalid
 */
export async function getUserFromApiKey(apiKey: string) {
  if (!apiKey) return null;

  const user = await prisma.user.findUnique({
    where: { apiKey },
  });

  return user ?? null;
}
