"use client"
import styles from "./setUsernameForm.module.css"
import { useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

const SetUsernameForm = () => {

    const {data: session, status, update} = useSession()
    const [username, setUsername] = useState('')
    const email = session?.user.email;
    const router = useRouter();
    



    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/changeUsername", {username, email});
            await update();
            // Could do a full page refresh here to reset tokens, but trying to avoid that to make it more seamless (might be preferred)
            router.push('/')
            
            // router.push('/')
            // window.location.href = '/';
            // console.log("logged in");
         } catch (err:any) {
            toast.error(err.response.data.message);
         }
    }




  return (
    <section>
        <form className={styles.signupForm} onSubmit={handleSubmit}>

            <div>
                <label>Username</label>
                <input required type='text' name="username" placeholder='' onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <button type="submit">Set Username</button>

        </form>
    </section>
  )
}

export default SetUsernameForm