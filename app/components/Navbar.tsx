"use client"
import styles from "./navbar.module.css"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

type NavbarProps = {
  session: any
}

const Navbar = ({session}: NavbarProps) => {
  // const session = useSession();

  const pathname = usePathname();

  if (pathname === '/setUsername') {
    return null;
  }
  
  

  return (
    <nav className={styles.navContainer}>
        <Link href={'/'}>Home</Link>
        <Link href={'/admin'}>Admin</Link>
        {/* <Link href={'/setUsername'}>Change</Link> */}
        {
          session?.user ? 
          <>
            <button onClick={() => signOut()}>Sign Out</button>
            {/* <Link href={'/register'}>Register</Link> */}
          </>
          :
          <>
          <Link href={'/register'}>Register</Link>
          <Link href={'/login'}>Login</Link>
          </>
        }
    </nav>
  )
}

export default Navbar


// We can set a custom callback url for the logout page too.