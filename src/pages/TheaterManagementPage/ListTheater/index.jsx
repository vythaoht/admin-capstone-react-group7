import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonUI from "../../../components/Button";
import { theatersRequest } from "../../../Redux/services/listTheaterAPI";

function ListTheater() {
  const [theaters, setTheaters] = useState([]);
  const navigate = useNavigate();

  const params = useParams();
  const { theaterId } = params;

  const fetchTheaters = async (theaterId) => {
    try {
      const data = await theatersRequest(theaterId);
      setTheaters(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTheaters(theaterId);
  }, [theaterId]);

  const onNavigateToListMovieOfTheater = (id) => {
    navigate(`/theater-management/listTheater/${theaterId}/${id}`);
  };
  return (
    <div className="cover">
      <h3 className="title">Thông Tin Cụm Rạp</h3>
      <table className="table">
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Mã Cụm Rạp</th>
            <th>Tên Rạp</th>
            <th>Địa Chỉ</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody style={{ textAlign: "left" }}>
          {theaters.map((item) => {
            return (
              <tr key={item.maCumRap}>
                <td>{item.maCumRap}</td>
                <td>{item.tenCumRap}</td>
                <td>{item.diaChi}</td>
                <td>
                  <ButtonUI
                    title="Danh Sách Phim"
                    onClick={() =>
                      onNavigateToListMovieOfTheater(item.maCumRap)
                    }
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

export default ListTheater;
