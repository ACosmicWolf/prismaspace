import BlogCard from "@/components/BlogCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany();

  const GenerateBlogCard = async (blog: any) => {
    const author = await prisma.user.findUnique({
      where: {
        id: blog.authorId,
      },
    });

    return <BlogCard key={blog.id} {...blog} author={author} />;
  };

  return (
    <div>
      <h1>Blogs</h1>

      <Link href="/blog/create">Create Blog</Link>

      {blogs.map((blog) => {
        return GenerateBlogCard(blog);
      })}
    </div>
  );
}
