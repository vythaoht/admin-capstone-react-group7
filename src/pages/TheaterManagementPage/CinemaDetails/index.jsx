import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cinemaDetailsRequest } from "../../../Redux/services/listTheaterAPI";
import styles from "./cinemaDetails.module.scss";
import Seat from "./Seat";
import cls from "classnames";

function CinemaDetails() {
  const [cinema, setCinema] = useState([]);
  const params = useParams();
  const { showTimeId } = params;

  const getCinemaDetails = async (showTimeId) => {
    try {
      const data = await cinemaDetailsRequest(showTimeId);
      setCinema(data);
    } catch (error) {
      toast.error("Thông tin không thể truy cập");
    }
  };
  useEffect(() => {
    getCinemaDetails(showTimeId);
  }, [showTimeId]);

  return (
    <div className={styles.container}>
      <div className={cls("row", styles.seatRow)}>
        {cinema.map((item, index) => {
          return (
            <div className={cls("col-1", styles.seatItem)} key={item.maGhe}>
              <Seat
                tenGhe={item.tenGhe}
                loaiGhe={item.loaiGhe}
                daDat={item.daDat}
              />
            </div>
          );
        })}
      </div>

      <div>
        <div className={styles.flex}>
          <div className={styles.stickDefault}></div>
          <span>Ghế Thường</span>
        </div>
        <div className={styles.flex}>
          <div className={styles.stickVip}></div>
          <span>Ghế Vip</span>
        </div>
        <div className={styles.flex}>
          <div className={styles.stickSoldOut}></div>
          <span>Ghế Đã Đặt</span>
        </div>
      </div>
    </div>
  );
}

export default CinemaDetails;
