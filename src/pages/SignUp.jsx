import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const SignUp = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [mailExists, setMailExists] = useState(false);
  const [invalidData, setInvalidData] = useState(false);

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    const nameValid = /^[A-Za-z]+$/.test(user.name);
    setInvalidData(!nameValid);

    if (!nameValid) return;

    try {
      await axios.post("http://localhost:3000/signup", {
        name: user.name,
        mail: user.email, 
        password: user.password,
      });

      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      if (message.toLowerCase().includes("email")) {
        setMailExists(true);
      } else {
        alert(message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E4E0E1] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#493628] mb-2">
            Create Account
          </h1>
          <p className="text-[#493628]">Join our fashion community</p>
        </div>

        <div className="bg-[#D6C0B3] rounded-lg shadow-lg p-8">
          {invalidData && (
            <div className="text-red-600 text-sm mb-4 text-center">
              Username must contain only alphabetical letters
            </div>
          )}
          {mailExists && (
            <div className="text-red-600 text-sm mb-4 text-center">
              User already exists, try to sign in
            </div>
          )}

          <form onSubmit={signUp} className="space-y-6">
            <div>
              <label className="block text-[#493628] font-medium mb-2">
                Username
              </label>
              <input
                required
                minLength={3}
                type="text"
                placeholder="Only letters allowed"
                className="w-full px-4 py-2 rounded-lg bg-[#E4E0E1] border border-[#AB886D] focus:border-[#493628] focus:outline-none text-[#493628]"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[#493628] font-medium mb-2">
                Email
              </label>
              <input
                required
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-[#E4E0E1] border border-[#AB886D] focus:border-[#493628] focus:outline-none text-[#493628]"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[#493628] font-medium mb-2">
                Password
              </label>
              <input
                required
                minLength={8}
                type="password"
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-2 rounded-lg bg-[#E4E0E1] border border-[#AB886D] focus:border-[#493628] focus:outline-none text-[#493628]"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-[#493628] hover:bg-[#AB886D] text-white font-bold rounded-lg transition-colors duration-200"
            >
              CREATE ACCOUNT
            </Button>

            <div className="text-center text-[#493628]">
              Already Have an Account?{" "}
              <a
                href="/login"
                className="text-[#493628] hover:text-[#AB886D] font-medium hover:underline"
              >
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
