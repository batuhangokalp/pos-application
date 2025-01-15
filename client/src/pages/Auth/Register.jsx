import CommonCarousel from "../../components/Auth/Carousel";
import RegisterForm from "../../components/Auth/RegisterForm";

const Register = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <RegisterForm />
        <CommonCarousel />
      </div>
    </div>
  );
};
export default Register;
