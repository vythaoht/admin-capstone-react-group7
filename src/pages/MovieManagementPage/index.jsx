import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./movieManagement.module.scss";
import ButtonUI from "../../components/Button";
import SearchForm from "../../components/SearchForm";
import { useState } from "react";
import { useEffect } from "react";
import {
  deleteMovieRequest,
  listMovieRequest,
} from "../../Redux/services/listMovieAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MovieManagementPage() {
  const columns = [
    {
      field: "maPhim",
      width: 120,
      renderHeader: (params) => {
        return <h3>Mã Phim</h3>;
      },
    },
    {
      field: "hinhAnh",
      width: 200,
      renderCell: (params) => {
        return (
          <img
            src={params.row.hinhAnh}
            alt={params.row.tenPhim}
            width="100"
            height="150"
          />
        );
      },
      renderHeader: (params) => {
        return <h3>Hình Ảnh</h3>;
      },
    },
    {
      field: "tenPhim",
      width: 200,
      renderHeader: (params) => {
        return <h3>Tên Phim</h3>;
      },
    },
    {
      field: "moTa",
      width: 300,
      renderHeader: (params) => {
        return <h3>Mô Tả</h3>;
      },
    },
    {
      field: "action",
      width: 200,
      renderHeader: (params) => {
        return <h3>Hành Động</h3>;
      },
      renderCell: (params) => {
        return (
          <div>
            {params.row.action.map((item, index) => {
              return (
                <Button
                  style={{
                    color: item.color,
                    fontSize: "24px",
                    border: "none",
                    minWidth: "24px",
                    padding: 0,
                    marginRight: "15px",
                  }}
                  key={index}
                  onClick={() => {
                    if (item.del) {
                      onDeleteMovie(params.row.maPhim);
                      return;
                    } else {
                      onNavigateToEditMovie(params.row.maPhim);
                    }
                  }}
                >
                  {item.text}
                </Button>
              );
            })}
          </div>
        );
      },
    },
  ];

  const [listMovie, setListMovie] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const fetchListMovie = async (values) => {
    try {
      const data = await listMovieRequest(values);
      const customListMovie = data.map((item) => {
        return {
          ...item,
          action: [
            {
              text: <EditOutlined />,
              color: "green",
              editable: true,
              del: false,
            },
            {
              text: <DeleteOutlined />,
              color: "red",
              editable: false,
              del: true,
            },
          ],
        };
      });
      setListMovie(customListMovie);
    } catch (error) {}
  };

  const onNavigateToAddMovie = () => {
    navigate("/movie-management/create");
  };

  const onDeleteMovie = async (maPhim) => {
    console.log(maPhim);
    try {
      const data = await deleteMovieRequest(maPhim);
      toast.success("Xoá phim thành công!");
      fetchListMovie();
    } catch (error) {}
  };

  const onNavigateToEditMovie = async (maPhim) => {
    navigate(`/movie-management/edit/${maPhim}`);
  };

  const onChangeInput = (e) => {
    setSearchText(e.target.value);
  };

  const fetchSearchMovie = async () => {
    try {
      const data = await listMovieRequest({
        tenPhim: searchText,
      });
      const customSearchMovie = data.map((item) => {
        return {
          ...item,
          action: [
            { text: <EditOutlined />, color: "green" },
            { text: <DeleteOutlined />, color: "red" },
          ],
        };
      });
      setListMovie(customSearchMovie);
    } catch (error) {}
  };

  useEffect(() => {
    fetchListMovie();
  }, []);

  return (
    <div style={{ height: 800, width: "100%" }}>
      <h3 className={styles.title}>Quản Lý Phim</h3>
      <ButtonUI title="Thêm Phim" mb={15} onClick={onNavigateToAddMovie} />
      <SearchForm
        placeholder="Search Tên Phim"
        onChange={onChangeInput}
        onClick={fetchSearchMovie}
      />
      <DataGrid
        rows={listMovie}
        getRowId={(row) => row.maPhim}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5]}
        style={{ height: "630px" }}
      />
    </div>
  );
}

export default MovieManagementPage;
