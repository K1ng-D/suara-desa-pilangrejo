"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginGuest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/Kritik&Saran");
    } catch (error) {
      if (error instanceof Error) {
        alert("Login gagal: " + error.message);
      } else {
        alert("Login gagal: Terjadi error yang tidak diketahui");
      }
    }
  };

  return (
    <div className="w-full h-screen bg-bglogin bg-cover bg-center">
      <div className="h-full w-full py-[125px] px-8 flex md:items-end items-center justify-center bg-black/80">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#8b2f31]">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black p-3 border border-[#8b2f31] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b2f31]"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-black border border-[#8b2f31] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b2f31]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#8b2f31] text-white hover:text-black py-3 rounded-md font-semibold hover:bg-[#f9d747] transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Belum punya akun?{" "}
              <a href="/Register" className="text-blue-500 hover:underline">
                Daftar di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
