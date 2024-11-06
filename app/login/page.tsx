"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export default function page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // เรียก API Login
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      // แสดงข้อความเมื่อ Login สำเร็จ
      Swal.fire({
        icon: "success",
        title: "ยินดีต้อนรับ",
        text: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // เก็บ Token ใน Local Storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);

        // Redirect ไปหน้า Home
        window.location.href = "/";
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เข้าสู้ระบบไม่สำเร็จ",
        text: error.response ? error.response.data.message : "",
      });
    }
  };
  // An error occurred. Please try again.
  return (
    <div className="grid h-screen place-items-center bg-[url('/fruit-head.jpeg')] bg-cover bg-gray-500 bg-blend-multiply">
      <div className="max-w-sm w-full">
        <h1 className="text-white text-center text-3xl font-medium mb-2">
          เข้าสู่ระบบ
        </h1>

        <form
          className="bg-slate-300 p-5 rounded-xl shadow-xl shadow-teal-300"
          onSubmit={handleLogin}
        >
          {/* Username */}
          <label
            htmlFor="username"
            className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ชื่อผู้ใช้
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password */}
          <label
            htmlFor="password"
            className="mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            รหัสผ่าน
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mt-3 text-center">
            <button
              type="submit"
              className="uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              เข้าสู่ระบบ
            </button>
          </div>

          <p className="text-sm">
            ยังไม่มีสมาชิก?
            <Link
              href="/register"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              &nbsp;สมัครเลย
            </Link>
            &nbsp;หรือ
            <Link
              href="/"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              &nbsp;กลับสู่หน้าหลัก
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
