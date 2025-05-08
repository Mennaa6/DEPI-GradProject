import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const Login = () => {
  const [user, setUser] = useState({ mail: "", password: "" });
  const [mailExists, setMailExists] = useState(true);
  const [wrongPass, setWrongPass] = useState(false);

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/login", {
        email: user.mail,
        password: user.password,
      });

      // Save token and user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navigate to profile page
      navigate("/profile");
    } catch (err) {
      if (err.response?.status === 401) {
        setWrongPass(true);
        setMailExists(true);
      } else if (err.response?.status === 400) {
        setMailExists(false);
      } else {
        console.error("Login error:", err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E4E0E1] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#493628] mb-2">Sign in</h1>
          <p className="text-[#493628]">Welcome back to our store</p>
        </div>

        <div className="bg-[#D6C0B3] rounded-lg shadow-lg p-8">
          {!mailExists && (
            <div className="text-red-600 text-sm mb-4 text-center">
              User doesn't exist, try to sign up
            </div>
          )}
          {wrongPass && (
            <div className="text-red-600 text-sm mb-4 text-center">
              Wrong password
            </div>
          )}

          <form onSubmit={signIn} className="space-y-6">
            <div>
              <label className="block text-[#493628] font-medium mb-2">
                Email
              </label>
              <input
                required
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-[#E4E0E1] border border-[#AB886D] focus:border-[#493628] focus:outline-none text-[#493628]"
                value={user.mail}
                onChange={(e) => setUser({ ...user, mail: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[#493628] font-medium mb-2">
                Password
              </label>
              <input
                required
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-[#E4E0E1] border border-[#AB886D] focus:border-[#493628] focus:outline-none text-[#493628]"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-[#493628] hover:bg-[#AB886D] text-white font-bold rounded-lg transition-colors duration-200"
            >
              SIGN IN
            </Button>

            <div className="text-center text-[#493628]">
              Don't Have an Account?{" "}
              <Link
                to="/sign-up"
                className="text-[#493628] hover:text-[#AB886D] font-medium hover:underline"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
