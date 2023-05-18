import React, { useEffect, useState } from "react";
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
import ButtonUI from "../../../components/Button";
import { toast } from "react-toastify";
import {
  createMovieRequest,
  getInfoMovieRequest,
  updateInfoMovieRequest,
} from "../../../Redux/services/listMovieAPI";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
function EditMovieManagement() {
  const [componentSize, setComponentSize] = useState("default");
  const [fileList, setFileList] = useState([]);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      maPhim: "",
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

  //-----//
  const { maPhim } = useParams();
  const navigate = useNavigate();

  const onEditMovie = async (maPhim) => {
    try {
      const data = await getInfoMovieRequest(maPhim);
      console.log(data);
      // update dữ  liệu vào ô input
      setValue("maPhim", data.maPhim);
      setValue("tenPhim", data.tenPhim);
      setValue("biDanh", data.biDanh);
      setValue("trailer", data.trailer);
      setValue("hinhAnh", data.hinhAnh);
      setFileList([
        ...fileList,
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: data.hinhAnh,
        },
      ]);
      setValue("moTa", data.moTa);
      setValue("maNhom", data.maNhom);
      setValue("ngayKhoiChieu", data.ngayKhoiChieu);
      setValue("danhGia", data.danhGia);
      setValue("hot", data.hot);
      setValue("sapChieu", data.sapChieu);
      setValue("dangChieu", data.dangChieu);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onEditMovie(maPhim);
  }, []);

  //Cập nhật lại - đẩy thông tin mới lên server (giống create)
  const onSubmit = async (values) => {
    if (!fileList.length) {
      toast.warning("Vui long chon hinh anh");
      return;
    }
    const payload = {
      ...values,
      hinhAnh:
        fileList.length && fileList[0]?.originFileObj
          ? fileList[0]?.originFileObj
          : fileList[0].url,
    };
    try {
      const data = await updateInfoMovieRequest(payload);
      if (data) {
        toast.success("Cập Nhật Phim Thành Công");
        //sau khi cập nhật, chuyển về trang Thông tin phim

        navigate("/movie-management");
      }
    } catch (error) {
      console.log(error);
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
        <Form.Item label="Mã Phim">
          <Controller
            name="maPhim"
            control={control}
            render={({ onChange, field }) => {
              return <Input onChange={onChange} {...field} />;
            }}
            rules={{
              required: true,
            }}
          />
        </Form.Item>
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
            render={({ field }) => {
              return (
                <Upload
                  action="/upload.do"
                  {...field}
                  onChange={({ fileList: newFileList }) => {
                    setFileList(newFileList);
                  }}
                  //   onRemove={() => setFileList([])}
                  fileList={fileList}
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
              return (
                <TextArea showCount rows={8} onChange={onChange} {...field} />
              );
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
                    value={dayjs(field.value)}
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
                <Switch onChange={onChange} {...field} checked={field.value} />
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

        <ButtonUI type="submit" title="Cập Nhật Phim" />
      </Form>
    </>
  );
}

export default EditMovieManagement;
