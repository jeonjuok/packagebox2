import Head from 'next/head';
// import Image from 'next/image';
// import styles from './styles.module.css';

export default function MyPage() {
  return (
    <div>
      <Head>
        <title>굿 패키지 디자인하기</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <aside >
        <div >
          <nav className={`${styles.nav} ${styles.flexColumn} ${styles.h100}`}>
            {/* Sidebar Content */}
            <a href="#" className={styles.sidebarLink}>
              Link 1
            </a>
            <a href="#" className={styles.sidebarLink}>
              Link 2
            </a>
            <a href="#" className={styles.sidebarLink}>
              Link 3
            </a>
          </nav>
        </div>

        <div className={styles.sidebarContentContainer}>
          {/* Additional Sidebar Content */}
          <div className={styles.sidebarContent}>
            <h3 className={styles.sidebarTitle}>Sidebar Title</h3>
            <p className={styles.sidebarText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              euismod ante in tellus cursus volutpat.
            </p>
          </div>
        </div>
      </aside>

      <div className={`${styles.workareaContainer} ${styles.splitHorizontal} ${styles.flexColumn}`} style={{ width: 'calc(50.5704% - 5px)' }}>
        {/* Workarea Content */}
        <div className={styles.workareaContent}>
          <h1 className={styles.workareaTitle}>Workarea Title</h1>
          <p className={styles.workareaText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            euismod ante in tellus cursus volutpat.
          </p>
        </div>
      </div>

      <div className={styles.splitterContainer} style={{ width: '10px' }}>
        <div className={`${styles.splitter} ${styles.flexColumn} ${styles.justifyContentBetween}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`${styles.threedContainer} ${styles.splitHorizontal}`} style={{ width: 'calc(49.4296% - 5px)' }}>
        {/* Threed Content */}
        <div className={styles.threedContent}>
          <h3 className={styles.threedTitle}>Threed Title</h3>
          <p className={styles.threedText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            euismod ante in tellus cursus volutpat.
          </p>
        </div>
      </div>
    </div>
  );
}
