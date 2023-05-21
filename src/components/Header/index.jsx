import { MDBBtnGroup, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from "mdb-react-ui-kit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./header.module.scss";
import { logout } from "../../Redux/slices/userAdminSlice";
import cls from 'classnames'

function Header() {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
  };

  return (
    <header className={styles.header}>
      <MDBDropdown group className={cls('shadow-0', styles.form__buttonAll)}>
        {user && (
          <>
            <MDBDropdownToggle >
              <p className={styles.infoUser}>
                <span className={styles.iconUser}>
                  <i className="fa fa-user-circle"></i>
                </span>
                {user.hoTen}
              </p>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem
                onClick={handleLogOut}
              >
                Đăng Xuất
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </>
        )}
      </MDBDropdown>





      {/* <MDBBtnGroup
        tag="form"
        className={`d-flex ${styles.form__buttonAll}`}
      >
        {user && (
          <div className={styles.logout__content}>
            <p className={styles.infoUser}>
              <span className={styles.iconUser}>
                <i className="fa fa-user-circle"></i>
              </span>
              {user.hoTen}
            </p>
            <button
              type="button"
              outline
              size="sm"
              onClick={handleLogOut}
            >
              <span className={styles.iconUser}>
                <i className="fa fa-sign-out-alt"></i>
              </span>
              Đăng Xuất
            </button>
          </div>
        )}
      </MDBBtnGroup> */}
    </header >
  )
}

export default Header;
