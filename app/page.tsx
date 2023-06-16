import { authOptions } from './api/auth/[...nextauth]/route'
import User from './components/User'
import styles from './page.module.css'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  
  const session = await getServerSession(authOptions)
  console.log("HITTTTTT",session);
  

  if(session?.user.isNewUser === true) {
    redirect('/setUsername')
  }

  



  return (
    <main className={styles.main}>
      <h1>home page</h1>
      <h1>Server Render:</h1>
      <p>{JSON.stringify(session)}</p>
      <User/>
    </main>
  )
}
