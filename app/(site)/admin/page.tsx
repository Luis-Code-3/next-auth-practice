import { getServerSession } from "next-auth"
import styles from "./page.module.css"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import {redirect} from "next/navigation"

const page = async () => {

    const session = await getServerSession(authOptions);
    if(session?.user.role !== "admin") {
        redirect('/login')
    }
    
  return (
    <div>Admin Only Page</div>
  )
}

export default page