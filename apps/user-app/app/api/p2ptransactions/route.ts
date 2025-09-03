import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ transactions: [] });
  }
  const userId = Number(session.user.id);
  const transactions = await prisma.p2ptransfer.findMany({
    where: {
      OR: [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    },
    orderBy: { timestamp: "desc" },
  });
  return NextResponse.json({ transactions });
}
