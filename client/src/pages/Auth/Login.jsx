import CommonCarousel from "../../components/Auth/Carousel";
import LoginForm from "../../components/Auth/LoginForm";

const Login = () => {
  return (
    <div className="h-screen w-full">
      <div className="flex justify-between h-full">
        <LoginForm />
        <CommonCarousel />
      </div>
    </div>
  );
};
export default Login;
