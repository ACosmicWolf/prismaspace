import { getServerSession } from "next-auth";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <main>
      <h1>PrismaSpace</h1>
      <p>PrismaSpace is a social network built with Next.js and Prisma.</p>
    </main>
  );
}
