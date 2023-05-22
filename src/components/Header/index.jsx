import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./header.module.scss";
import { logout } from "../../Redux/slices/userAdminSlice";
import Dropdown from "react-bootstrap/Dropdown";

function Header() {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
  };

  return (
    <header className={styles.header}>
      <Dropdown className={styles.form__buttonAll}>
        {user && (
          <>
            <Dropdown.Toggle>
              <p className={styles.infoUser}>
                <span className={styles.iconUser}>
                  <i className="fa fa-user-circle"></i>
                </span>
                {user.hoTen}
              </p>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogOut}>Đăng Xuất</Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </header>
  );
}

export default Header;
