"use client";

import { User } from "@prisma/client";

import styles from "./BlogForm.module.css";
import { useState } from "react";

interface Props {
  user: User | null;
}

export default function BlogForm({ user }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function CreateBlog(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const body = {
      title: formData.get("title"),
      content: formData.get("content"),
    };

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess("Blog created successfully!");
    } else {
      throw new Error("Something went wrong");
    }
  }

  return (
    <>
      {loading && <p>Loading...</p>}

      {success !== "" && (
        <p className={styles.successMsg}>
          <span>{success}</span>
          <button onClick={() => setSuccess("")}>X</button>
        </p>
      )}

      <form className={styles.form} onSubmit={CreateBlog}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" disabled={loading} />
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" disabled={loading} />
        <button type="submit" disabled={loading}>
          Create
        </button>
      </form>
    </>
  );
}
