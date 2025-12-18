import React from "react"
import Button from "../Button/Button"
import styles from "./UserCard.module.scss"

const UserCard = ({userAccountData}) => {
    return (
  <section className={styles.account}>
 <div className={styles.accountContentWrapper}>
          <h3 className={styles.accountTitle}>{userAccountData.title}</h3>
          <p className={styles.accountAmount}>{userAccountData.amount}</p>
          <p className={styles.accountAmountDescription}>{userAccountData.description}</p>
          </div>
          <div className={styles.cta}>
<Button border transaction text="View transactions"/>
</div>
</section>
    )
}

export default UserCard;