import { prisma } from "@/lib/prisma";
import { Comment, User } from "@prisma/client";
import Link from "next/link";

import styles from "./BlogCard.module.css";

interface Props {
  id: string;
  title: string;
  createdAt: any;
  author: User;
}

const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];

export default function BlogCard({ id, title, createdAt, author }: Props) {
  const createdDate = new Date(createdAt);

  return (
    <a href={`/blog/${id}`} className={styles.wrapperLink}>
      <div className={styles.card}>
        <h2>{title}</h2>

        <span>
          Author: <Link href={`/users/${author.id}`}>{author.name}</Link>
        </span>

        <p>
          Created At: {createdDate.getDate()}, {months[createdDate.getMonth()]}{" "}
          {createdDate.getFullYear()}
        </p>
      </div>
    </a>
  );
}
