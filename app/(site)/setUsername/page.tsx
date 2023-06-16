import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SetUsernameForm from "./components/SetUsernameForm"
import styles from "./page.module.css"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

const page = async () => {


    const session = await getServerSession(authOptions);
    if(!session?.user.isNewUser) {
        redirect('/')
    }


  return (
    <>
    <h2>Set Username:</h2>
    <SetUsernameForm/>
    </>
  )
}

export default page