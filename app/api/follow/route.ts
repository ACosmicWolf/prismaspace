import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("POST /api/follow");
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const { targetUserId } = await req.json();

  const currentID = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((user) => user?.id!);

  const record = await prisma.follows.create({
    data: {
      followerId: currentID,
      followingId: targetUserId,
    },
  });

  console.log("Successfully created follow", record);

  return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const targetUserID = req.nextUrl.searchParams.get("targetUserId");

  const currentID = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((user) => user?.id!);

  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentID,
        followingId: targetUserID!,
      },
    },
  });

  return NextResponse.json(record);
}
