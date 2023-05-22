import React, { useEffect } from "react";
import styles from "./createBookingManagement.module.scss";
import { useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, Input, Space, Form, InputNumber } from "antd";
import ButtonUI from "../../../components/Button";
import { getCreateShowTimeAPI } from "../../../Redux/services/createShowtimeAPI";
import { toast } from "react-toastify";
import dayjs from "dayjs";

function CreateBookingManagement() {
  const [searchParams, setSearchParams] = useSearchParams([]);

  const { handleSubmit, setValue, control, reset } = useForm({
    defaultValues: {
      maPhim: 0,
      maRap: "",
      ngayChieuGioChieu: Date.now(),
      giaVe: 0,
    },
  });

  const maPhimParam = searchParams
    ? parseInt(searchParams.get("maPhim"))
    : parseInt(0);
  const maCumRapParam = searchParams ? searchParams.get("maCumRap") : null;

  useEffect(() => {
    if (maPhimParam && maCumRapParam) {
      setValue("maPhim", maPhimParam);
      setValue("maRap", maCumRapParam);
    }
  }, [searchParams]);

  const onSubmit = async (values) => {
    try {
      await getCreateShowTimeAPI({
        maPhim: values.maPhim,
        maRap: values.maRap,
        ngayChieuGioChieu: dayjs(values.ngayChieuGioChieu).format(
          "DD/MM/YYYY HH:mm:ss"
        ),
        giaVe: values.giaVe,
      });
      toast.success("Tạo lịch chiếu thành công");
      reset({
        maPhim: parseInt(0),
        maRap: "",
        ngayChieuGioChieu: Date.now(),
        giaVe: 0,
      });
    } catch (error) {
      toast.error("Tạo lịch chiếu không thành công");
    }
  };

  return (
    <div>
      <div>
        <h6 className={styles.notice}>
          Nhập "Mã phim" và "Mã Cụm Rạp", nếu không nhớ chính xác vui lòng truy
          cập vào "Danh sách rạp"
        </h6>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <Controller
            name="maPhim"
            control={control}
            render={({ onChange, field }) => {
              return (
                <InputNumber
                  type="text"
                  onChange={onChange}
                  {...field}
                  style={{ width: "50rem" }}
                  placeholder="Mã Phim"
                  value={maPhimParam}
                />
              );
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="maRap"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Input
                  type="text"
                  onChange={onChange}
                  {...field}
                  placeholder="Mã Cụm Rạp"
                  value={maCumRapParam}
                />
              );
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="ngayChieuGioChieu"
            control={control}
            render={({ field }) => {
              return (
                <Space direction="vertical" size={12}>
                  <DatePicker
                    onChange={field.onChange}
                    value={dayjs(field.value)}
                    style={{ width: "50rem" }}
                    showTime={{
                      format: "HH:mm:ss",
                    }}
                    format="DD/MM/YYYY HH:mm:ss"
                  />
                </Space>
              );
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="giaVe"
            control={control}
            render={({ onChange, field }) => {
              return (
                <InputNumber
                  type="text"
                  onChange={onChange}
                  {...field}
                  style={{ width: "50rem" }}
                  placeholder="Giá Vé"
                />
              );
            }}
          />
        </div>

        <div className={styles.formGroup}>
          <ButtonUI type="submit" title="Tạo Lịch Chiếu" />
        </div>
      </form>
    </div>
  );
}

export default CreateBookingManagement;
