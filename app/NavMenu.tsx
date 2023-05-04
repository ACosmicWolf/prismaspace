import Image from "next/image";
import Link from "next/link";

import styles from "./NavMenu.module.css";

export default function NavMenu() {
  return (
    <nav className={styles.nav}>
      <Link href={"/"} className={styles.logo}>
        PrismaSpace
      </Link>
      <ul className={styles.links}>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/users"}>Users</Link>
        </li>
        <li>
          <Link href={"/blog"}>Blog</Link>
        </li>
      </ul>
    </nav>
  );
}
