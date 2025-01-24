import CommonCarousel from "../../components/Auth/Carousel";
import LoginForm from "../../components/Auth/LoginForm";

const Login = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="h-screen w-full flex flex-col md:flex-row justify-center items-center">
        <LoginForm />
        <CommonCarousel />
      </div>
    </div>
  );
};
export default Login;
