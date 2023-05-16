import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./searchForm.module.scss";

function SearchForm({ placeholder, onClick, onChange }) {
  return (
    <div className={styles.inputSearchMovie}>
      <input
        onChange={onChange}
        className={styles.input}
        type="text"
        placeholder={placeholder}
      />
      <button className={styles.searchIcon} onClick={onClick}>
        <SearchOutlined />
      </button>
    </div>
  );
}

export default SearchForm;
