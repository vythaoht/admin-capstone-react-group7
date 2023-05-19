import React, { Fragment, useEffect, useState } from "react";
import ButtonUI from "../../components/Button";
import SearchForm from "../../components/SearchForm";
import styles from './userManagementPage.module.scss';
import { getListAccountAPI, deleteUserAPI } from "../../Redux/services/listAccountAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";


function UserManagementPage() {
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [search, setSearch] = useState("");
  const [searchParam] = useState(["taiKhoan"]);
  const navigate = useNavigate();

  const getAccounts = async () => {
    try {
      const data = await getListAccountAPI();
      setAccounts(data.content);
    } catch (error) {
      toast.setError("Không lấy được danh sách tài khoản");
    }
  }

  useEffect(() => {
    getAccounts();
  }, []);

  // Xử lý tìm kiếm
  const handleChange = (evt) => {
    setSearch(evt.target.value);
  };

  function Search(account) {
    return account.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(search.toLowerCase()) >
          -1
        );
      });
    });
  }


  // xử lý phân trang
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = accounts.slice(firstPostIndex, lastPostIndex);

  // render danh sách người dùng
  const renderListAccount = () => {
    return Search(currentPost)?.map((user, index) => {
      return (
        <tr key={user.taiKhoan} className="user-item">
          <td>{index + 1}</td>
          <td>{user.taiKhoan}</td>
          <td>{user.matKhau}</td>
          <td>{user.hoTen}</td>
          <td>{user.email}</td>
          <td>{user.soDT}</td>
          <td>{user.maLoaiNguoiDung}</td>
          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div className={styles.edit__action}>
              <i
                className="fa fa-user-edit"
                onClick={() => {
                  onNavigateToEditUser(user.taiKhoan);
                }}
              ></i>
            </div>
            <div
              className={styles.delete__action}
              onClick={() => {
                onDeleteAccount(user.taiKhoan);
              }}
            >
              <i className="fa fa-trash-alt"></i>
            </div>
          </td>
        </tr>
      )
    })
  }

  // xử lý chuyển sang trang thêm người dùng
  const onNavigateToAddUser = () => {
    navigate("/user-management/create");
  };

  // Xử lý chuyển sang trang chỉnh sửa thông tin
  const onNavigateToEditUser = async (accountName) => {
    navigate(`/user-management/edit/${accountName}`);
  };

  // Hàm xóa tài khoản
  const onDeleteAccount = async (accountName) => {
    try {
      const data = await deleteUserAPI(accountName);
      toast.success("Xoá tài khoản thành công!");
    } catch (error) {
      toast.setError("Xóa tài khoản không thành công");
    }
  }


  return (
    <Fragment>
      <div className="title">
        <h2>Danh Sách Người Dùng</h2>
        <ButtonUI title="Thêm Tài Khoản" onClick={onNavigateToAddUser} />
        <SearchForm
          placeholder="Search Tên Phim"
          onChange={handleChange}
          value={search}
        />
      </div>
      <div className={styles.table__responsive}>
        <table className={`table table-sm ${styles.table__item}`}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tài Khoản</th>
              <th scope="col">Mật Khẩu</th>
              <th scope="col">Họ Tên</th>
              <th scope="col">Email</th>
              <th scope="col">Số ĐT</th>
              <th scope="col">Người dùng</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>{renderListAccount()}</tbody>
        </table>
        <Pagination
          totalPosts={accounts.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Fragment>
  )
}

export default UserManagementPage;
