import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  CheckOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  InsertRowBelowOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Breadcrumb } from "antd";
import HeaderComponent from "../../components/Header";
import AdminProtected from "../../route/AdminProtected";
const { Header, Sider, Content } = Layout;

function getItem(label, key, children) {
  return {
    key,
    children,
    label,
  };
}

function AdminTemplate() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Quản Lý Người Dùng",
                children: [
                  {
                    key: "1.1",
                    label: (
                      <Link to="/user-management">Danh Sách Người Dùng</Link>
                    ),
                  },
                ],
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Quản Lý Phim",
                children: [
                  {
                    key: "2.1",
                    label: <Link to="/movie-management">Danh Sách Phim</Link>,
                  },
                ],
              },
              {
                key: "3",
                icon: <CheckOutlined />,
                label: "Quản Lý Đặt Vé",
                children: [
                  {
                    key: "3.1",
                    label: (
                      <Link to="/booking-management/create">
                        Tạo lịch chiếu
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "4",
                icon: <InsertRowBelowOutlined />,
                label: "Quản Lý Rạp",
                children: [
                  {
                    key: "4.1",
                    label: <Link to="/theater-management">Danh Sách Rạp</Link>,
                  },
                ],
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <HeaderComponent />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <AdminProtected>
              <Outlet />
            </AdminProtected>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default AdminTemplate;
