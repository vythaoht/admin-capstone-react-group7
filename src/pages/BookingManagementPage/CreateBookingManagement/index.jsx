import React, { useEffect } from 'react'
import styles from "./createBookingManagement.module.scss";
import { useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, Input, Space, Form, InputNumber } from 'antd';
import ButtonUI from '../../../components/Button';
import { getCreateShowTimeAPI } from '../../../Redux/services/createShowtimeAPI';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

function CreateBookingManagement() {
  const [searchParams, setSearchParams] = useSearchParams([]);

  const { handleSubmit, setValue, control, reset } = useForm({
    defaultValues: {
      maPhim: 0,
      maRap: "",
      ngayChieuGioChieu: "01/01/1998 00:00:00",
      giaVe: 0,
    }
  })

  const maPhimParam = searchParams ? parseInt(searchParams.get("maPhim")) : parseInt(0);
  const maCumRapParam = searchParams ? searchParams.get("maCumRap") : null;

  console.log(maPhimParam);
  console.log(maCumRapParam);

  useEffect(() => {
    if (maPhimParam && maCumRapParam) {
      setValue("maPhim", maPhimParam);
      setValue("maRap", maCumRapParam);
    }
  }, [searchParams]);


  const onSubmit = async (values) => {
    try {
      console.log({ ...values });
      await getCreateShowTimeAPI({
        maPhim: values.maPhim,
        maRap: values.maRap,
        ngayChieuGioChieu: values.ngayChieuGioChieu,
        giaVe: values.giaVe,
      });
      toast.success("Tạo lịch chiếu thành công");
      reset({
        maPhim: parseInt(0),
        maRap: "",
        ngayChieuGioChieu: "01/01/1998 00:00:00",
        giaVe: 0,
      });
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
          render={({ onChange, field }) => {
            return (
              <Space direction="vertical" size={12}>
                <DatePicker
                  onChange={onChange}
                  style={{ width: "50rem" }}
                  value={dayjs(field.ngayChieuGioChieu)}
                  showTime
                  format="DD/MM/YYYY hh:mm:ss"
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
