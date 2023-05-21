import React from "react";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../Redux/slices/userAdminSlice";
import { Navigate, useSearchParams } from "react-router-dom";

function LoginPage() {
  const [togglePassword, setTogglePassword] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return state.userReducer;
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    taiKhoan: "",
    matKhau: "",
  });

  const onSubmit = async (values) => {
    dispatch(
      loginRequestAction({
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
      })
    );
  };

  if (user) {
    const url = searchParams.get("redirectUrl") || "/";
    return <Navigate to={url} />;
  }

  return (
    <div className={styles.background}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.cover}>
          <div className={styles.icon}>
            <i className="fa fa-user-lock"></i>
          </div>
          <h4 className={styles.text}>Đăng Nhập User Admin</h4>

          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="text"
              placeholder="Tài Khoản *"
              {...register("taiKhoan", {
                required: {
                  value: true,
                  message: "Tài khoản không được để trống",
                },
                pattern: {
                  value: /^\S+$/,
                  message: "Tài khoản không được chứa khoảng trắng",
                },
              })}
            />
            {errors.taiKhoan && (
              <p className={styles.error}>{errors.taiKhoan.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type={togglePassword ? "text" : "password"}
              placeholder="Mật Khẩu *"
              {...register("matKhau", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
                  message: "Mật khẩu phải chứa ít nhất 1 chữ cái và 1 chữ số",
                },
              })}
            />
            {errors.matKhau && (
              <p className={styles.error}>{errors.matKhau.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => setTogglePassword(!togglePassword)}
            />
            <label htmlFor="showPassword">Hiển Thị Mật Khẩu</label>
          </div>

          <div className={styles.formGroup}>
            <button className={styles.button}>Đăng Nhập</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
