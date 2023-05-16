import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./movieManagement.module.scss";
import ButtonUI from "../../components/Button";
import SearchForm from "../../components/SearchForm";

const columns = [
  { field: "id", headerName: "Mã Phim", width: 120 },
  { field: "img", headerName: "Hình Ảnh", width: 200 },
  { field: "name", headerName: "Tên Phim", width: 200 },
  { field: "description", headerName: "Mô Tả", width: 300 },
  {
    field: "action",
    headerName: "Hành Động",
    width: 200,
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

const rows = [
  {
    id: 1,
    img: "",
    name: "Mermaid",
    description: "Must Watch",
    action: [
      { text: <EditOutlined />, color: "green" },
      { text: <DeleteOutlined />, color: "red" },
    ],
  },
];

function MovieManagementPage() {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <h3 className={styles.title}>Quản Lý Phim</h3>
      <ButtonUI title="Thêm Phim" />
      <SearchForm placeholder="Search Tên Phim" />
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

export default MovieManagementPage;
