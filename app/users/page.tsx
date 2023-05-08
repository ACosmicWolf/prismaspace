import { prisma } from "@/lib/prisma";

import styles from "./users.module.css";
import UserCard from "@/components/UserCard";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div className={styles.grid}>
      {users.map((user) => {
        return <UserCard key={user.id} {...user} />;
      })}
    </div>
  );
}
