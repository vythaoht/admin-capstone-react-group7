import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  getInfoAccountAPI,
  updateUserAPI,
} from "../../../Redux/services/listAccountAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import cls from "classnames";
import styles from "./editUserManagement.module.scss";
import { Input } from "antd";
import ButtonUI from "../../../components/Button";

function EditUserManagement() {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { taiKhoan } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      xacThucMatKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP07",
      hoTen: "",
      maLoaiNguoiDung: "",
    },
    mode: "onChange",
  });

  // Xử lý hiển thị dữ liệu lên Input
  const onEditAccount = async (accountName) => {
    try {
      const data = await getInfoAccountAPI(accountName);
      // update dữ  liệu vào ô Input
      setValue("taiKhoan", data.taiKhoan);
      setValue("matKhau", data.matKhau);
      setValue("xacThucMatKhau", data.xacThucMatKhau);
      setValue("email", data.email);
      setValue("soDt", data.soDt);
      setValue("maNhom", "GP07");
      setValue("hoTen", data.hoTen);
      setValue("maLoaiNguoiDung", data.maLoaiNguoiDung);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    onEditAccount(taiKhoan);
  }, []);

  // Xử lý cập nhật dữ liệu
  const onSubmit = async (values) => {
    values.preventDefault();
    try {
      const data = await updateUserAPI(values);
      if (data) {
        toast.success("Cập Nhật thông tin Thành Công");
        navigate("/user-management");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center">
        {/* dùng template string để add thêm class cho className đã có sẵn hoặc dùng thư viện classnames */}
        <i className={cls("fa fa-user-edit", styles.icon)}></i>
      </div>
      <h4 className="text-center">Cập nhật thông tin tài khoản</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <Controller
            name="taiKhoan"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Input
                  type="text"
                  onChange={onChange}
                  {...field}
                  placeholder="Tài Khoản *"
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "Tài khoản không được để trống",
              },
              pattern: {
                value: /^\S+$/,
                message: "Tài khoản không được chứa khoảng trắng",
              },
            }}
          />
          {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <Controller
            name="matKhau"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Input
                  type={togglePassword ? "text" : "password"}
                  onChange={onChange}
                  {...field}
                  placeholder="Mật Khẩu *"
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "Mật khẩu không được để trống",
              },
              pattern: {
                value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
                message: "Mật khẩu phải chứa ít nhất 1 chữ cái và 1 chữ số",
              },
            }}
          />
          {errors.matKhau && <p>{errors.matKhau.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <Controller
            name="xacThucMatKhau"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Input
                  type={togglePassword ? "text" : "password"}
                  onChange={onChange}
                  {...field}
                  placeholder="Nhập Lại Mật Khẩu *"
                />
              );
            }}
            rules={{
              required: {
                value: true,
              },
              validate: (val) => {
                if (watch("matKhau") != val) {
                  return "Nhập lại mật khẩu không khớp";
                }
              },
            }}
          />
          {errors.xacThucMatKhau && <p>{errors.xacThucMatKhau.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <Controller
            name="hoTen"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Input
                  type="text"
                  onChange={onChange}
                  {...field}
                  placeholder="Họ Tên *"
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "Họ tên không được để trống",
              },
            }}
          />
          {errors.hoTen && <p>{errors.hoTen.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <Controller
            name="email"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Input
                  type="text"
                  onChange={onChange}
                  {...field}
                  placeholder="Email *"
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "Email không được để trống",
              },
            }}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <Controller
            name="soDt"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Input
                  type="text"
                  onChange={onChange}
                  {...field}
                  placeholder="Số Điện Thoại *"
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "Số điện thoại không được để trống",
              },
              pattern: {
                value: /[\d]/,
                message: "Vui lòng nhập đúng định dạng",
              },
            }}
          />
          {errors.soDt && <p>{errors.soDt.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="maLoaiNguoiDung"
            control={control}
            render={({ onChange, field }) => {
              return (
                <select
                  onChange={onChange}
                  {...field}
                  placeholder="Số Điện Thoại *"
                >
                  <option value="#">--Chọn loại người dùng--</option>
                  <option value="KhachHang">Khách Hàng</option>
                  <option value="QuanTri">Quản Trị</option>
                </select>
              );
            }}
            rules={{
              required: {
                value: true,
                message: "Vui lòng chọn loại người dùng",
              },
            }}
          />
          {errors.maLoaiNguoiDung && <p>{errors.maLoaiNguoiDung.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <Controller
            name="maNhom"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Input
                  type="text"
                  onChange={onChange}
                  {...field}
                  placeholder="maNhom *"
                  disabled={true}
                />
              );
            }}
          />
        </div>

        <div className={styles.showPass}>
          <input
            type="checkbox"
            id="showPassword"
            onChange={() => setTogglePassword(!togglePassword)}
          />
          <label htmlFor="showPassword" className="ms-2">
            Hiển thị mật khẩu
          </label>
        </div>
        <div className={styles.formGroup}>
          <ButtonUI title="Cập Nhật" disabled={isLoading} />
        </div>
      </form>
    </div>
  );
}

export default EditUserManagement;
