import axiosClient from "../../config/axiosClient";

export const listMovieRequest = async (payload) => {
  try {
    let url = `/QuanLyPhim/LayDanhSachPhim?maNhom=GP07`;
    if (payload?.tenPhim) {
      url += `&tenPhim=${payload.tenPhim}`;
    }

    const response = await axiosClient.get(url);
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

// //API call để search tên phim
// export const searchMovieRequest = async (payload) => {
//   try {
//     if (!payload.tenPhim) {
//       listMovieRequest();
//       return;
//     }
//     const response = await axiosClient.get(
//       `/QuanLyPhim/LayDanhSachPhim?maNhom=${payload.maNhom}&tenPhim=${payload.tenPhim}`
//     );
//     return response.data.content;
//   } catch (error) {
//     throw error;
//   }
// };

//API xoá phim
export const deleteMovieRequest = async (maPhim) => {
  try {
    const response = await axiosClient.delete(
      `/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`
    );
    return true;
  } catch (error) {
    throw error;
  }
};

//API thêm phim
export const createMovieRequest = async (movie) => {
  try {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }

    await axiosClient.post(`/QuanLyPhim/ThemPhimUploadHinh`, formData);
  } catch (error) {
    throw error.response.data.content;
  }
};

//API lấy thông tin phim từ server để hiện thị ra
export const getInfoMovieRequest = async (movieId) => {
  try {
    const response = await axiosClient.get(
      `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

//API cập nhật phim, upload hình ảnh
export const updateInfoMovieRequest = async (movie) => {
  try {
    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }

    await axiosClient.post(`/QuanLyPhim/CapNhatPhimUpload`, formData);
    return true;
  } catch (error) {
    console.log(error);
  }
};
