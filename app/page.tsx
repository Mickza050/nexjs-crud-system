"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "./component/navbar";
import Indexhead from "./component/indexhead";
import Footer from "./component/footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   router.push("/");
    // }
  }, [router]);

  return (
    <>
      {/* <h1>Index Page</h1> */}
      <Navbar></Navbar>
      <Indexhead></Indexhead>
      <Footer></Footer>
    </>
  );
}
