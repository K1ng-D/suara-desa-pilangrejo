"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [kritikSaran, setKritikSaran] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Track if we are on the client-side
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // We are now in the client-side
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === "adminsuaradesa123@gmail.com") {
        setUser(user);
        fetchKritikSaran();
      } else {
        router.push("/admin-login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchKritikSaran = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "kritik_saran"));
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setKritikSaran(data);
    } catch (error) {
      console.error("Error fetching kritik dan saran: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin-login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (!isClient) {
    return null; // Render nothing on the server-side until the client is ready
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {user && <p>Selamat datang, {user.email}</p>}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded mt-4 mb-8"
      >
        Logout
      </button>

      <h2 className="text-2xl font-semibold mb-4">Daftar Kritik dan Saran</h2>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#8b2f31]"></div>
        </div>
      ) : kritikSaran.length > 0 ? (
        <ul className="space-y-4">
          {kritikSaran.map((item) => (
            <li
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-700 mb-2">{item.kritik}</p>
              <p className="text-sm text-gray-500">
                {item.createdAt &&
                  new Date(item.createdAt.seconds * 1000).toLocaleString()}
              </p>
              {item.nama && (
                <p className="text-sm text-gray-600">
                  Dikirim oleh: {item.nama}
                </p>
              )}
              {item.userEmail && (
                <p className="text-sm text-gray-600">Email: {item.userEmail}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Tidak ada kritik atau saran.</p>
      )}
    </div>
  );
}
