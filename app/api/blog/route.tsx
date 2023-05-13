import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const userID = await prisma.user
    .findUnique({
      where: {
        email: currentUserEmail,
      },
    })
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }

      return user.id;
    });

  const data = await req.json();

  const blog = await prisma.blog.create({
    data: {
      title: data.title,
      body: data.content,
      authorId: userID,
    },
  });

  return NextResponse.json(blog);
}
