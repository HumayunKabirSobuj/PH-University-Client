import { Button, Row } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const defaultValues = {
    id: 'A-0001',
    password: 'admin123',
  };

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging In...");
    try {
      const res = await login(data).unwrap();
      //   console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;
      //   // console.log(user)
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login Succesfully", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something Went Wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type={"text"} name={"id"} label={"ID :"} />
        <PHInput type={"text"} name={"password"} label={"Password :"} />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
