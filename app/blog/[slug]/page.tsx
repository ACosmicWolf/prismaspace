import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: Props) {
  const blog = await prisma.blog.findUnique({
    where: {
      id: params.slug,
    },
  });

  const author = await prisma.user.findUnique({
    where: {
      id: blog?.authorId,
    },
  });

  const comments = await prisma.comment.findMany({
    where: {
      blogId: blog?.id,
    },
    include: {
      commenter: true,
    },
  });

  return (
    <main>
      <h1>{blog?.title}</h1>
      <span>
        Author: <Link href={`/users/${author?.id}`}>{author?.name}</Link>
      </span>
      <p>{blog?.body}</p>

      <h2>Comments</h2>

      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <p>{comment.body}</p>
            <span>
              Commenter:{" "}
              <Link href={`/users/${comment.commenterId}`}>
                {comment.commenter.name}
              </Link>
            </span>
          </div>
        );
      })}
    </main>
  );
}
