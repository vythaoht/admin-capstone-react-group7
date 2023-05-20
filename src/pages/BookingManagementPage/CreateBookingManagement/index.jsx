import React, { useEffect } from 'react'
import styles from "./createBookingManagement.module.scss";
import { useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, Input, Space, Form, InputNumber } from 'antd';
import ButtonUI from '../../../components/Button';
import { getCreateShowTimeAPI } from '../../../Redux/services/createShowtimeAPI';
import { toast } from 'react-toastify';

function CreateBookingManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { handleSubmit, setValue, control, watch } = useForm({
    defaultValues: {
      maPhim: 0,
      maRap: "",
      ngayChieuGioChieu: "01/01/1998",
      giaVe: 0,
    }
  })

  useEffect(() => {
    if (searchParams.get("maPhim") && searchParams.get("maRap")) {
      setValue("maPhim", searchParams.get("maPhim"));
      setValue("maRap", searchParams.get("maCumRap"));
    }
  }, [searchParams]);


  const onSubmit = async (values) => {
    try {
      console.log({ ...values });
      await getCreateShowTimeAPI({
        ...values,
        maPhim: values.maPhim,
        maRap: values.maRap,
        ngayChieuGioChieu: values.ngayChieuGioChieu,
        giaVe: values.giaVe,
      });
      toast.setError("Tạo lịch chiếu thành công");

    } catch (error) {
      toast.setError("Tạo lịch chiếu không thành công");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <Controller
          name="maPhim"
          control={control}
          render={({ onChange, field }) => {
            return (
              <Input
                type="text"
                onChange={onChange}
                {...field}
                placeholder="Mã Phim"
                value={searchParams.get("maPhim")}
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
                value={searchParams.get("maCumRap")}
              />
            );
          }}
        />
      </div>

      <div className={styles.formGroup}>
        <Controller
          name="ngayChieuGioChieu"
          control={control}
          render={({ onChange, field }) => {
            return (
              <Space direction="vertical" size={12}>
                <DatePicker
                  onChange={onChange}
                  style={{ width: "50rem" }}
                  format="DD/MM/YYYY"
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
        <ButtonUI type="submit" title='Tạo Lịch Chiếu' />
      </div>
    </form>
  );
}

export default CreateBookingManagement;
