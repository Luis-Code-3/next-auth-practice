"use client"

import styles from "./user.module.css"
import { useSession } from "next-auth/react"

const User = () => {
    const {data: session} = useSession();



  return (
    <div>
        <h1>Client Render:</h1>
        <p>{JSON.stringify(session)}</p>
    </div>
  )
}

export default User