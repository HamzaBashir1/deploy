import React, { useState, useContext } from "react";
import { Base_URL } from "../../config";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon

const LoginPopup = ({ onLoginSuccess, onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const result = await res.json();
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      setLoading(false);
      toast.success(result.message);
      onLoginSuccess();
      onClose();
    } catch (err) {
      console.log(err.message);
      toast.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-sm p-6 bg-white rounded-lg">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-black"
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="mb-5 flex justify-center">
          <Image
            src="/P.png"
            width={48}
            height={48}
            className="border bg-gradient-to-t from-white to-[#D0D5DD] rounded-lg"
            alt="Logo"
          />
        </div>
        <h2 className="mb-4 text-2xl font-bold text-center">Log in to your account</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 mt-1 border rounded-md"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 mt-1 border rounded-md"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" passHref>
              <p className="text-sm text-[#4FBE9F] hover:underline">Forgot password?</p>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-[#4FBE9F] text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
          </button>
        </form>
        <p className="text-sm font-light text-gray-500 text-center mt-4">
          Don't have an account?{" "}
          <Link href="/Signup" passHref>
            <p className="font-medium text-[#4FBE9F] hover:underline">Register here</p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
