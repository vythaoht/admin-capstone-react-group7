import React from "react";
import styles from "./button.module.scss";

function ButtonUI({
  title,
  bgColor = "transparent",
  color = "rgb(5, 122, 206)",
  borderColor = "rgb(5, 122, 206)",
  mb = 0,
  onClick,
}) {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: color,
        borderColor: borderColor,
        marginBottom: mb,
      }}
      className={styles.buttonAddMovie}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default ButtonUI;
