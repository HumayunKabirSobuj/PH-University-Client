import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const onFinish = async (values: { id: string; password: string }) => {
    const toastId = toast.loading("Logging In...");
    try {
      const res = await login(values).unwrap();
      // console.log(res);
      const user = verifyToken(res.data.accessToken);
      // console.log(user)
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login Succesfully", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something Went Wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{
          width: "400px",
          height: "260px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
        onFinish={onFinish}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Login Here
        </h1>
        <Form.Item
          name="id"
          rules={[{ required: true, message: "Please input your ID!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="ID" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          {/* <Input prefix={<LockOutlined />} type="password" placeholder="Password" /> */}
          <Input.Password prefix={<LockOutlined />} placeholder="PASSWORD" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
