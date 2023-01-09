import Head from 'next/head'

import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <main>

        <div className={styles.center}>
         
         <p>Welcome to Learning Tube a decentralised application for watching and streaming videos online.</p>
          
        </div>

      </main>
    </>
  )
}
