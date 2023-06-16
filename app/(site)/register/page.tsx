"use client"

import styles from "./page.module.css"
import { useState} from "react"
import axios from "axios";
import {useRouter} from "next/navigation"
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";


const page = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    // const session = useSession();

    // if(session?.status === 'authenticated') {
    //     router.push('/')
    // }

    // useEffect(() => {
    //     if(session?.status === 'authenticated') {
    //       router.push('/')
    //     }
    //   }, [session?.status,router])
    



    const handleSubmit = async (e:any) => {
        e.preventDefault();
         try {
            await axios.post("http://localhost:3000/api/register", {username, password, email});
            signIn('credentials', {email, password, redirect: false})
                .then((callback) => {
                    if(callback?.error) {
                        console.log("ERROR!!!");
                        
                        toast.error("Invalid Credentials");
                      }
                      if(callback?.ok && !callback?.error) {
                        console.log("TRYING TO PUSH");

                        // Router push is working when we have a navbar and have hovered over or been on page before. This is because those ssr pages are cached and not revalidating
                        
                        // router.push('/')
                        window.location.href = '/';
                      }
                })
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

            <div>
                <label>Email</label>
                <input required type='email' name="email" placeholder='' onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div>
                <label>Password</label>
                <input required type='password' name="password" placeholder='' onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <button type="submit">REGISTER</button>

        </form>
    </section>
  )
}

export default page