// pages/index.js
import Head from 'next/head'
import styles from '../styles/ThreeScene.module.css'
import ThreeScene from '../components/ThreeScene'

export default function Home() {
  return (
    <>
      <Head>
        <title>My first three.js app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.scene}>
        <div className="page">
        <ThreeScene />
        </div>
      </div>

    </>
  )
}
