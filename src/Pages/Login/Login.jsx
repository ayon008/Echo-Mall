import { useContext, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signIn(email, password);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login Success!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
      });

    }
  };

  return (
    <div className="login-wrapper py-12 px-4 md:px-0">
      <div className="container my-20">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <Fade direction="up" cascade damping={0.2} triggerOnce>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-8 text-center">
                Login
              </h1>
              <div>
                {/* email */}
                <div className="form-control mb-4">
                  <label className="label" htmlFor="email">
                    <span className="label-text text-[#555656]">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="email"
                    className="input md:py-7 border-[#D5D5D5] border-2 focus:outline-none focus:border-primary"
                    {...register("email", { required: true })}
                  />
                </div>
                {/* password */}
                <div className="form-control mb-6 relative">
                  <label className="label" htmlFor="password">
                    <span className="label-text text-[#555656]">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="password"
                    className="input md:py-7 border-[#D5D5D5] border-2 focus:outline-none focus:border-primary pr-12"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-12 md:top-14 text-lg"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {/* login button */}
                <div className="form-control mb-6">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 md:py-4 md:px-8 md:text-xl disabled:text-white rounded"
                  >
                    Login
                  </button>
                </div>
                {/* link to register page */}
                <div className="flex items-center justify-center gap-x-5">
                  <span className="label-text text-[#555656] flex items-center gap-x-2">
                    Don&#39;t have an account? Click here <HiArrowLongRight />
                  </span>

                  <input
                    type="checkbox"
                    onClick={(e) =>
                      !e.target.checked &&
                      setTimeout(() => navigate("/register"), 500)
                    }
                    className="toggle toggle-secondary"
                    defaultChecked
                  />
                </div>
              </div>
            </Fade>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
