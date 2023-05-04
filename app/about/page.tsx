import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Social media website built using nextjs.",
};

export default async function About() {
  return (
    <main>
      <h1>About</h1>
      <p>Social media website built using nextjs.</p>
    </main>
  );
}
