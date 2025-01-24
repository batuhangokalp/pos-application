import CommonCarousel from "../../components/Auth/Carousel";
import LoginForm from "../../components/Auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden flex justify-center items-center px-4 md:px-8">
      <div className="max-w-screen-lg w-full flex flex-col md:flex-row justify-center items-center gap-8">
        <LoginForm />
        <CommonCarousel />
      </div>
    </div>
  );
};
export default Login;
