import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminTemplate from "./templates/AdminTemplate";
import UserManagementPage from "./pages/UserManagementPage";
import BookingManagementPage from "./pages/BookingManagementPage";
import MovieManagementPage from "./pages/MovieManagementPage";
import TheaterManagementPage from "./pages/TheaterManagementPage";
import LoginPage from "./pages/LoginPage";
import CreateUserManagement from "./pages/UserManagementPage/CreateUserManagement";
import CreateMovieManagement from "./pages/MovieManagementPage/CreateMovieManagement";
import CreateBookingManagement from "./pages/BookingManagementPage/CreateBookingManagement";
import EditMovieManagement from "./pages/MovieManagementPage/EditMovieManagement";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Route trang chủ */}
          <Route path="/" element={<AdminTemplate />}>
            {/* Route home */}
            <Route index element={<HomePage />} />

            {/* Danh sách người dùng - Tạo người dùng */}
            <Route path="user-management">
              <Route index element={<UserManagementPage />} />
              <Route path="create" element={<CreateUserManagement />} />
            </Route>

            {/* Danh sách phim - Tạo Phim - Edit Phim */}
            <Route path="movie-management">
              <Route index element={<MovieManagementPage />} />
              <Route path="create" element={<CreateMovieManagement />} />
              <Route path="edit/:maPhim" element={<EditMovieManagement />} />
            </Route>

            {/* Tạo Lịch Chiếu */}
            <Route path="booking-management">
              <Route index element={<BookingManagementPage />} />
              <Route path="create" element={<CreateBookingManagement />} />
            </Route>

            {/* Danh Sách Rạp */}
            <Route
              path="theater-management"
              element={<TheaterManagementPage />}
            />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
