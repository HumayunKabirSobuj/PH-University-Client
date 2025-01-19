import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { PoweroffOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { useLogOutMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
const { Header, Content } = Layout;

const MainLayout = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const [logOut] = useLogOutMutation();

  const dispatch = useAppDispatch();
  const handleLogout = async (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);

    dispatch(logout());
    toast.success("Logout succesfully",{duration:2000})
    await logOut({});
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar></Sidebar>
      <Layout>
        <Header>
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            loading={loadings[1]}
            onClick={() => handleLogout(1)}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {/* <h1>The main content should go here</h1> */}
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
