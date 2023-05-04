import Image from "next/image";
import Link from "next/link";

import styles from "./NavMenu.module.css";
import { SignInButton, SignOutButton } from "@/components/buttons";
import AuthCheck from "@/components/AuthCheck";

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
        <li>
          <SignInButton />
        </li>
        <li>
          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
        </li>
      </ul>
    </nav>
  );
}
