import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const Loginpage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    emailid: "",
    password: "",
  });

  const handleclick = (e) => {
    e.preventDefault();

    if (!formdata.emailid || !formdata.password) {
      return toast.error("All fields required");
    }
    // console.log(formdata)
    login(formdata);
  };

  const handlecross = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen relative flex justify-center items-center overflow-hidden text-white">

      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black"></div>

      {/* 💡 Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>

      {/* Optional Spline (uncomment if needed) */}
      {/*
      <spline-viewer
        url="https://prod.spline.design/cwq814qIdbhTkjqB/scene.splinecode"
        background="transparent"
        class="absolute top-0 left-0 w-full h-full z-0"
      ></spline-viewer>
      */}

      {/* Form */}
      <form
        onSubmit={handleclick}
        className="relative z-10 space-y-7 w-full max-w-md p-8 rounded-2xl 
                   bg-slate-900/60 backdrop-blur-xl border border-slate-700 
                   shadow-2xl hover:shadow-indigo-500/20 transition"
      >

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Login
          </h2>

          <button
            onClick={handlecross}
            className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition"
          >
            ✕
          </button>
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-300">
            Email
          </label>

          <input
            type="email"
            className="border border-slate-700 rounded-lg px-4 py-2 bg-slate-800/70 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Enter your email"
            value={formdata.emailid}
            onChange={(e) =>
              setformdata({ ...formdata, emailid: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-300">
            Password
          </label>

          <input
            type="password"
            className="border border-slate-700 rounded-lg px-4 py-2 bg-slate-800/70 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={(e) =>
              setformdata({ ...formdata, password: e.target.value })
            }
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 
                     hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/30 
                     py-2 rounded-lg font-semibold transition"
        >
          Login
        </button>

        {/* Extra */}
        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </form>
    </div>
  );
};