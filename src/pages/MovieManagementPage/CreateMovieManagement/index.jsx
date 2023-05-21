import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Space,
  Switch,
  Upload,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { createMovieRequest } from "../../../Redux/services/listMovieAPI";
import ButtonUI from "../../../components/Button";
import { toast } from "react-toastify";
import dayjs from "dayjs";

function CreateMovieManagement() {
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      maNhom: "",
      ngayKhoiChieu: "01/01/1998",
      danhGia: 0,
      hot: false,
      dangChieu: false,
      sapChieu: false,
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      hinhAnh: values.hinhAnh?.fileList[0]?.originFileObj,
    };

    try {
      await createMovieRequest(payload);
      toast.success("Thêm phim thành công");
      reset();
    } catch (error) {
      toast.error("Thêm phim không thành công");
    }
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
          paddingLeft: "100px",
        }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item label="Tên Phim">
          <Controller
            name="tenPhim"
            control={control}
            render={({ onChange, field }) => {
              return <Input onChange={onChange} {...field} />;
            }}
            rules={{
              required: true,
            }}
          />
        </Form.Item>
        <Form.Item label="Bí Danh">
          <Controller
            name="biDanh"
            control={control}
            render={({ onChange, field }) => {
              return <Input onChange={onChange} {...field} />;
            }}
            rules={{
              required: true,
            }}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Controller
            name="trailer"
            control={control}
            render={({ onChange, field }) => {
              return <Input onChange={onChange} {...field} />;
            }}
            rules={{
              required: true,
            }}
          />
        </Form.Item>
        <Form.Item
          label="Hình Ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Controller
            name="hinhAnh"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Upload
                  action="/upload.do"
                  onChange={onChange}
                  // fileList={[]}
                  {...field}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
              );
            }}
            rules={{
              required: true,
            }}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Controller
            name="moTa"
            control={control}
            render={({ onChange, field }) => {
              return <Input onChange={onChange} {...field} />;
            }}
            rules={{
              required: true,
            }}
          />
        </Form.Item>
        <Form.Item label="Mã Nhóm">
          <Controller
            name="maNhom"
            control={control}
            render={({ onChange, field }) => {
              return <Input onChange={onChange} {...field} />;
            }}
            rules={{
              required: true,
            }}
          />
        </Form.Item>
        <Form.Item
          label="Ngày Khởi Chiếu"
          labelCol={{
            style: {
              marginRight: 5,
            },
          }}
          rules={{
            required: true,
          }}
        >
          <Controller
            name="ngayKhoiChieu"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Space direction="vertical" size={12}>
                  <DatePicker
                    // showTime={{
                    //   format: "HH:mm",
                    // }}
                    format="DD/MM/YYYY"
                    onChange={onChange}
                  />
                </Space>
              );
            }}
            rules={{
              required: true,
            }}
          />
        </Form.Item>
        <Form.Item label="Đánh Giá">
          <Controller
            name="danhGia"
            control={control}
            render={({ onChange, field }) => {
              return <InputNumber onChange={onChange} {...field} />;
            }}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Controller
            name="hot"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Switch
                  onChange={onChange}
                  {...field}
                  checked={field.value}
                  w
                />
              );
            }}
          />
        </Form.Item>
        <Form.Item label="Đang Chiếu" valuePropName="checked">
          <Controller
            name="dangChieu"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Switch onChange={onChange} {...field} checked={field.value} />
              );
            }}
          />
        </Form.Item>
        <Form.Item label="Sắp Chiếu" valuePropName="checked">
          <Controller
            name="sapChieu"
            control={control}
            render={({ onChange, field }) => {
              return (
                <Switch onChange={onChange} {...field} checked={field.value} />
              );
            }}
          />
        </Form.Item>

        <ButtonUI type="submit" title="Thêm Phim" />
      </Form>
    </>
  );
}

export default CreateMovieManagement;
