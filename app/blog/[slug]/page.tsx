export const revalidate = 420;

interface Post {
  title: string;
  slug: string;
  content: string;
}

interface Props {
  params: {
    slug: string;
  };
}

export async function getStaticPaths() {
  const posts: Post[] = await fetch("http://localhost:3000/api/content").then(
    (res) => res.json()
  );

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const posts: Post[] = await fetch("http://localhost:3000/api/content").then(
    (res) => res.json()
  );

  const post = posts.find((post) => post.slug === params.slug)!;

  console.log(post);

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
