"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registrasi berhasil!");
      router.push("/Login"); // Redirect ke halaman login setelah registrasi berhasil
    } catch (error) {
      if (error instanceof Error) {
        setError("Registrasi gagal: " + error.message);
      } else {
        setError("Registrasi gagal: Terjadi error yang tidak diketahui");
      }
    }
  };

  return (
    <div className="w-full h-screen mt-10 bg-bgregister bg-cover bg-center">
      <div className="h-full w-full py-[125px] px-8 flex md:items-end items-center justify-center bg-black/80">
        <div className="w-full  max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#8b2f31]">
            Register
          </h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleRegister} className="space-y-4">
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
                className="w-full text-black p-3 border border-[#8b2f31] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b2f31]"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-black p-3 border border-[#8b2f31] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b2f31]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#8b2f31] text-white hover:text-black py-3 rounded-md font-semibold hover:bg-[#f9d747] transition duration-300"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Sudah punya akun?{" "}
              <a href="/Login" className="text-blue-500 hover:underline">
                Login di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
