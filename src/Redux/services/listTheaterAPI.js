import axiosClient from "../../config/axiosClient";

//Api lấy thông tin hệ thống rạp
export const listTheaterRequest = async () => {
  try {
    const response = await axiosClient.get("/QuanLyRap/LayThongTinHeThongRap");
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

//api lấy thông tin các cụm rạp theo maHeThongRap
export const theatersRequest = async (theaterId) => {
  try {
    const response = await axiosClient.get(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${theaterId}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

//api lấy thông tin lịch chiếu phim tương ứng với từng rạp
export const listMovieOfTheaterRequest = async (theaterId, id) => {
  try {
    const response = await axiosClient(
      `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${theaterId}&maNhom=GP07`
    );
    const newListTheater = response.data.content[0].lstCumRap;
    return newListTheater.filter((item) => {
      return item.maCumRap === id;
    });
  } catch (error) {
    throw error;
  }
};
