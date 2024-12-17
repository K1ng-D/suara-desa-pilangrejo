"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export default function KritikSaran() {
  const [kritik, setKritik] = useState(""); // state untuk kritik/saran
  const [imageBase64, setImageBase64] = useState<string | null>(null); // state untuk menyimpan gambar sebagai base64
  const [loading, setLoading] = useState(false); // untuk loading state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // untuk status login
  const router = useRouter();

  // Mengecek status autentikasi pengguna
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/Login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Mengonversi file gambar menjadi base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageBase64(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "kritik_saran"), {
        kritik: kritik,
        image: imageBase64, // simpan gambar sebagai base64
        createdAt: new Date(),
      });

      alert("Kritik/Saran berhasil dikirim!");
      setKritik(""); // Reset form kritik
      setImageBase64(null); // Reset form gambar
    } catch (error) {
      console.error("Error adding document:", error);
      alert(
        "Terjadi kesalahan: " +
          (error instanceof Error ? error.message : "Error tidak diketahui")
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen mt-6 bg-bgkritik bg-cover bg-center">
      <div className="h-full w-full py-[125px] px-8 flex md:items-end items-center justify-center bg-black/80">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#8b2f31]">
            Kritik dan Saran
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                value={kritik}
                onChange={(e) => setKritik(e.target.value)}
                placeholder="Masukkan kritik atau saran Anda"
                className="w-full text-black p-3 border border-[#8b2f31] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b2f31]"
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#8b2f31] text-white hover:text-black py-3 rounded-md font-semibold hover:bg-[#f9d747] transition duration-300"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Kirim Kritik/Saran"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
