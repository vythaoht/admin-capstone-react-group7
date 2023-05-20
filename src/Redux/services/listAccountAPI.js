import axiosClient from "../../config/axiosClient";

// Call API lấy danh dách người dùng
export const getListAccountAPI = async () => {
  const { data } = await axiosClient.get(
    `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${"GP07"}`
  );
  return data;
};

// Call API thêm tài khoản
export async function addUserAPI(payload) {
  try {
    const response = await axiosClient.post(
      "/QuanLyNguoiDung/ThemNguoiDung",
      payload
    );
    return response;
  } catch (error) {
    throw error.response.data.content;
  }
}

// Call API lấy thông tin tài khoản
export async function getInfoAccountAPI(accountName) {
  try {
    const response = await axiosClient.post(
      `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${accountName}`
    );

    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

// Call API cập nhật thông tin
export async function updateUserAPI(accountName) {
  try {
    const response = await axiosClient.put(
      `/QuanLyNguoiDung/CapNhatThongTinNguoiDung?TaiKhoan=${accountName}`
    );
    return response;
  } catch (error) {
    throw error.response.data.content;
  }
}

// Call API xóa tài khoản
export async function deleteUserAPI(accountName) {
  try {
    const response = await axiosClient.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${accountName}`
    );
    return response;
  } catch (error) {
    throw error.response.data.content;
  }
}
