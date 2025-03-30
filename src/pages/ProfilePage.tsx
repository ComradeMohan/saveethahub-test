import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Define a prop interface with user and onLogout props.
interface ProfilePageProps {
  user: { username: string; email?: string } | null;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [tempData, setTempData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  // Fetch user data from Firestore using email from localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.log("No user email found. Redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const data = userDoc.data();
          setUserData(data);
          setTempData(data);
        } else {
          setError("User not found in Firestore.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle input changes in edit mode
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  // Save updated data to Firestore
  const handleSave = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) return;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "users", userDoc.id), {
          fullName: tempData.fullName,
          username: tempData.username,
          registrationNumber: tempData.registrationNumber,
          department: tempData.department,
        });
        setUserData(tempData);
        setIsEditing(false);
        setError("");
      } else {
        setError("User document not found.");
      }
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Error updating user data.");
    }
  };

  // Handle logout: sign out from Firebase, remove email from localStorage, and call onLogout prop.
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userEmail");
      onLogout(); // Call the parent's logout handler to clear user state
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-0 from-blue-700 via-blue-500 to-green-500 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Your Profile</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {userData ? (
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
            <div className="space-y-4">
              {[
                { label: "Full Name", name: "fullName" },
                { label: "Email", name: "email" },
                { label: "Register Number", name: "registrationNumber" },
                { label: "Department", name: "department" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-medium text-gray-700">{field.label}:</label>
                  {isEditing && field.name !== "email" ? (
                    <input
                      type="text"
                      name={field.name}
                      value={tempData[field.name] || ""}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder={`Enter ${field.label}`}
                    />
                  ) : (
                    <p className="mt-1 p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                      {userData[field.name] || "—"}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200 font-medium"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200 font-medium"
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-white">User data not found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;