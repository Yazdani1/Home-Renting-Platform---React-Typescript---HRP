import React from 'react'

import style from "./SkeltonCard.module.scss";


const SkeltonCard = () => {
  return (
    <div className={style.skeltonContainer}>
        <div className={style.skeltonImageCard}>

        </div>
        <div className={style.skeltonlistItemTitle}></div>
        <div className={style.skeltonlistItemCategory}></div>

        <div className={style.skeltonlistItemAmount}></div>

    </div>
  )
}

export default SkeltonCard