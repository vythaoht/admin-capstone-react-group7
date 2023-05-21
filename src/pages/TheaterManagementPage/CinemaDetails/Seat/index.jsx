import React from "react";
import styles from "./seat.module.scss";
import cls from "classnames";

function Seat({ tenGhe, loaiGhe, daDat }) {
  if (daDat) {
    return (
      <button
        className={cls("btn", styles.seatCommon, styles.seatSoldOut)}
        disabled
      >
        sold
      </button>
    );
  }
  return (
    <button
      className={cls(
        "btn",
        styles.seatCommon,
        loaiGhe === "Vip" ? styles.seatVip : styles.seatDefault
      )}
    >
      {tenGhe}
    </button>
  );
}

export default Seat;
