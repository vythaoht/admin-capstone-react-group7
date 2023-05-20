import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonUI from "../../components/Button";
import { listTheaterRequest } from "../../Redux/services/listTheaterAPI";

function TheaterManagementPage() {
  const [listTheater, setListTheater] = useState([]);
  const navigate = useNavigate();
  const fetchListTheater = async () => {
    try {
      const data = await listTheaterRequest();
      setListTheater(data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchListTheater();
  }, []);

  const onNavigateToListTheater = (theaterId) => {
    navigate(`/theater-management/listTheater/${theaterId}`);
  };

  return (
    <div className="cover">
      <h3 className="title">Quản Lý Rạp</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Mã Hệ Thống Rạp</th>
            <th>Tên Hệ Thống Rạp</th>
            <th>Bí Danh</th>
            <th>Logo</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {listTheater.map((item) => {
            return (
              <tr key={item.maHeThongRap}>
                <td>{item.maHeThongRap}</td>
                <td>{item.tenHeThongRap}</td>
                <td>{item.biDanh}</td>
                <td>
                  <img
                    src={item.logo}
                    alt={item.tenHeThongRap}
                    width="50"
                    height="50"
                  />
                </td>
                <td>
                  <ButtonUI
                    title="Xem Cụm Rạp"
                    onClick={() => onNavigateToListTheater(item.maHeThongRap)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TheaterManagementPage;
