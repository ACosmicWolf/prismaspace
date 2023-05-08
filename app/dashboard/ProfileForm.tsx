"use client";

import styles from "./Dashboard.module.css";

type Props = {
  user: any;
};

export function ProfileForm({ user }: Props) {
  async function updateUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const body = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      age: formData.get("age"),
      image: formData.get("image"),
    };

    const res = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <form onSubmit={updateUser} className={styles.form}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" defaultValue={user?.name ?? ""} />
        <label htmlFor="bio">Bio</label>
        <textarea name="bio" defaultValue={user?.bio ?? ""} />
        <label htmlFor="age">Age</label>
        <input type="number" name="age" defaultValue={user?.age ?? ""} />
        <label htmlFor="image">User Profile Image</label>
        <input type="text" name="image" defaultValue={user?.image ?? ""} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
