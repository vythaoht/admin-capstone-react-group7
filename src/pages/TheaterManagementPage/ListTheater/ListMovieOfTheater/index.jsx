import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { listMovieOfTheaterRequest } from "../../../../Redux/services/listTheaterAPI";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonUI from "../../../../components/Button";
import { Modal } from "antd";
import moment from "moment";
import { toast } from "react-toastify";

function ListMovieOfTheater() {
  const [listMovie, setListMovie] = useState([]);
  const [showTime, setShowTime] = useState(null);
  const params = useParams();
  const { theaterId, id } = params;
  const navigate = useNavigate();
  //---
  const columns = [
    { field: "maPhim", headerName: "Mã Phim", width: 90 },
    {
      field: "tenPhim",
      headerName: "Tên Phim",
      width: 150,
      editable: true,
    },
    {
      field: "hinhAnh",
      headerName: "Hình Ảnh",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <img
            src={params.row.hinhAnh}
            alt={params.row.maPhim}
            width="50"
            height="50"
          />
        );
      },
    },
    {
      field: "dangChieu",
      headerName: "Đang Chiếu",
      type: "boolean",
      width: 110,
      editable: true,
    },
    {
      field: "hot",
      headerName: "Hot",
      type: "boolean",
      width: 110,
      editable: true,
    },
    {
      field: "sapChieu",
      headerName: "Sắp Chiếu",
      type: "boolean",
      width: 110,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      editable: true,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <ButtonUI
              title="Xem Lịch Chiếu"
              onClick={() => showModal(params.row)}
            />

            <ButtonUI
              title="Tạo Lịch Chiếu"
              borderColor="green"
              color="green"
              onClick={() =>
                onNavigateToCreateShowTimePage(params.row.maPhim, id)
              }
            />
          </div>
        );
      },
    },
  ];
  //---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (row) => {
    setShowTime(row);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchListMovieOfTheater = async (theaterId, id) => {
    try {
      const data = await listMovieOfTheaterRequest(theaterId, id);
      setListMovie(data[0].danhSachPhim);
    } catch (error) {
      toast.error("Thông tin không thể truy cập");
    }
  };
  useEffect(() => {
    if (theaterId && id) {
      fetchListMovieOfTheater(theaterId, id);
    }
  }, [theaterId, id]);

  const onNavigateToCreateShowTimePage = (movieId, id) => {
    navigate(`/booking-management/create?maPhim=${movieId}&maCumRap=${id}`);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={listMovie}
          columns={columns}
          getRowId={(row) => row.maPhim}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Modal
        title={showTime?.tenPhim}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div className="cover">
          <table className="table">
            <thead>
              <tr>
                <th>Mã Lịch Chiếu</th>
                <th>Mã Rạp</th>
                <th>Tên Rạp</th>
                <th>Ngày Giờ Chiếu</th>
                <th>Giá Vé</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {showTime?.lstLichChieuTheoPhim.map((item) => {
                return (
                  <tr key={item.maLichChieu}>
                    <td>{item.maLichChieu}</td>
                    <td>{item.maRap}</td>
                    <td>{item.tenRap}</td>
                    <td>
                      {moment(item.ngayChieuGioChieu).format(
                        "DD/MM/YYYY hh:mm"
                      )}
                    </td>
                    <td>{item.giaVe.toLocaleString()}</td>
                    <td>
                      <ButtonUI
                        title="Xem Chi Tiết"
                        onClick={() => {
                          navigate(`/cinema/${item.maLichChieu}`);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}

export default ListMovieOfTheater;
