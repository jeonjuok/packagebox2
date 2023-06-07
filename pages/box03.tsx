// pages/index.js
import Head from 'next/head'
import styles from '../styles/ThreeScene.module.css'
import ThreeScene3 from '../components/ThreeScene3'

export default function Home() {
  return (
    <>
      <Head>
        <title>My first three.js app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.scene}>
        <div className="page">
        <ThreeScene3 />
        </div>
      </div>

    </>
  )
}
