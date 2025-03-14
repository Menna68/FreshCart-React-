import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { userContext } from "../../Context/User.context";
import { Helmet } from "react-helmet";

export default function Login() {
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [emailOrPasswordError, setEmailOrPasswordError] = useState(null);

  let passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const [showPass, setShowPass] = useState("password");
  function showPassword() {
    setShowPass((prev) => (prev === "password" ? "text" : "password"));
  }

  const validationSchema = object({
    email: string()
      .required("Email address is required")
      .email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character"
      ),
  });

  async function sendData(values) {
    let toastLoadingId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("User logged in successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
      setEmailOrPasswordError(errorMessage);
    } finally {
      toast.dismiss(toastLoadingId);
    }
  }

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: sendData,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page " />
      </Helmet>
      <section className="px-4 py-10">
        <div className="inear">
          <h2 className="text-2xl font-semibold text-gray-950 ">
           Login Now
          </h2>
          <form className="py-8 space-y-2" onSubmit={formik.handleSubmit}>
            <div className="email">
              <label htmlFor="email" className="text-lg mb-1 text-gray-950 ">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="form-control w-full "
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-sm text-red-600 bg-red-100 py-2 px-2 mt-1 rounded-xl border border-red-300">
                  *{formik.errors.email}
                </p>
              )}
            </div>
            <div className="password">
              <label htmlFor="password" className="text-lg mb-1 text-gray-950 ">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPass}
                  id="password"
                  placeholder="Password"
                  className="form-control w-full "
                  {...formik.getFieldProps("password")}
                />
                <div onClick={showPassword} className="absolute right-[10px] top-[8px] cursor-pointer">
                  {showPass === "password" ? (
                    <i className="fa-regular fa-eye text-gray-500 text-lg"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash text-gray-500 text-lg"></i>
                  )}
                </div>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="text-sm text-red-600 bg-red-100 py-2 px-2 mt-1 rounded-xl border border-red-300">
                  *{formik.errors.password}
                </p>
              )}
              {emailOrPasswordError && (
                <p className="text-sm text-red-600 bg-red-100 py-2 px-2 mt-1 rounded-xl border border-red-300">
                  *{emailOrPasswordError}
                </p>
              )}
            </div>


            
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className={`bg-primay-600 rounded-lg py-2 px-8 text-white text-xl my-3 ${
                  !formik.isValid || formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {formik.isSubmitting ? "Loading..." : "Login"}
              </button>
              <Link
                to={"/forgetPassword"}
                className="text-blue-600 underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="w-full text-center underline">
              <Link to={"/Signup"} className="text-blue-600 underline text-md">
                Don't have an account? Sign up here
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
