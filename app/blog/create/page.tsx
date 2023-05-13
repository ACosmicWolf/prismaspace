import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BlogForm from "./BlogForm";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export default async function CreateBlogForm() {
  const session = await getServerSession(authOptions);

  const currentUserEmail = session?.user?.email!;

  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  return (
    <div>
      <h1>New Blog</h1>

      <BlogForm user={user} />
    </div>
  );
}
