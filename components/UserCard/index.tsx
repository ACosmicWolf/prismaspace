import Link from "next/link";
import styles from "./usercard.module.css";

interface Props {
  id: string;
  name: string | null;
  image: string | null;
  age: number | null;
}

export default function UserCard({ id, name, image, age }: Props) {
  return (
    <div className={styles.card}>
      <img
        src={image ?? "/mememan.webp"}
        alt={`${name}'s profile`}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3>
          <Link href={`/users/${id}`}>{name}</Link>
        </h3>
      </div>
      <div>Age: {age}</div>
    </div>
  );
}
