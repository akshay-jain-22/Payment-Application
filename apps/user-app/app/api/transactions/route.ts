import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ transactions: [] });
  }
  const transactions = await prisma.onRampTransaction.findMany({
    where: { userId: Number(session.user.id) },
    orderBy: { startTime: "desc" },
  });
  return NextResponse.json({ transactions });
}
