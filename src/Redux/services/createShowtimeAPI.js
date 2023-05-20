import axiosClient from "../../config/axiosClient";

// Call API tạo lịch chiếu
export const getCreateShowTimeAPI = async (values) => {
  try {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    await axiosClient.post(`/QuanLyDatVe/TaoLichChieu`, formData);
    // return true;
  } catch (error) {
    throw error.response.data.content;
  }
};