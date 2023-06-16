"use client"

import styles from "./page.module.css"
import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import {useRouter} from "next/navigation"
import { toast } from "react-hot-toast"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"


const page = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const searchParams = useSearchParams();

    
    
    // const session = useSession();
    

    // useEffect(() => {
    //   if(session?.status === 'authenticated') {
    //     router.push('/')
    //   }
    // }, [session?.status,router])


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        signIn('credentials', {email, password, redirect: false})
          .then((callback) => {
            if(callback?.error) {
              toast.error("Invalid Credentials");
            }
            if(callback?.ok && !callback?.error) {
              //If I router.push here on credentials signin or register it will not full reload the page unlike a social login. This means my navbar and cached routes wont wont update!
              // router.push('/')

              // If i didnt want the toast, then we could just do a callbackUrl to trigger the full page reload.

              // We could do this same thing in the callback URL (also have to add a custom error page which can be set in AuthOptions), but if we want access to the Toast we have set the redirect to false. 
              window.location.href = '/'; //does a full page reload here
            }
          })
          .finally(() => {
            console.log('done');
          })
    }

    const socialLogin = async (action: string) => {
      signIn(action, { callbackUrl: '/' })
        // .then((callback) => {
        //   console.log("here",callback);
          
        //   if(callback?.error) {
        //     toast.error("Invalid Credentials");
        //   }
        //   alert('here')
        //   if(callback?.ok) {
        //     alert("hi")
        //     router.push('/')
        //   }
        // })
    }


  return (
    <section>
        <p>{searchParams.get('error') ? "To Confirm your identity, sign in with the same account you originally signed in with" :null}</p>
        <form className={styles.signupForm} onSubmit={handleSubmit}>

            <div>
                <label>Email</label>
                <input required type='email' name="email" placeholder='' onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div>
                <label>Password</label>
                <input required type='password' name="password" placeholder='' onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            <button type="submit">SIGN IN</button>

        </form>

        <h4>Sign In with Github</h4>
        <button onClick={() => socialLogin('github')} className={styles.gitButton}>GITHUB SIGN IN</button>

        <h4>Sign In with Google</h4>
        <button onClick={() => socialLogin('google')} className={styles.gitButton}>GOOGLE SIGN IN</button>
    </section>
  )
}

export default page