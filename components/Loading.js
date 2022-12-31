import styles from '../styles/Home.module.css'

export const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading ? 
        (
          <div className={styles.spinnerBox}>
            <div className={styles.circleBorder}>
              <div className={styles.circleCore}></div>
            </div>  
          </div>
        )
      : null}
    </>
  )
}
