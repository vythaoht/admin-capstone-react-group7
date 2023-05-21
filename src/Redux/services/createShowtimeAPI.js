import axiosClient from "../../config/axiosClient";

// Call API tạo lịch chiếu
export const getCreateShowTimeAPI = async (values) => {
  try {
    const payload = { ...values };

    const { data } = await axiosClient.post("/QuanLyDatVe/TaoLichChieu", payload);
    return data;

  } catch (error) {
    throw error.response.data.content;
  }
};