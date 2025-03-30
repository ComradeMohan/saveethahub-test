import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

// Add interface for SubjectItem props
interface SubjectItemProps {
  subj: {
    name: string;
    grade: string;
  };
  index: number;
}

const SubjectItem: React.FC<SubjectItemProps> = ({ subj, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.li
      ref={ref}
      className="flex justify-between p-3 bg-white/15 rounded-lg text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }} // 👈 Staggering effect
    >
      <span>{subj.name}</span>
      <span>{subj.grade}</span>
    </motion.li>
  );
};

// Add interface for user data
interface UserData {
  id: string;
  email?: string;
  grades?: Array<{
    name: string;
    grade: string;
  }>;
  fetchMessage?: string;
  [key: string]: any;
}

const CGPACalculatorPage: React.FC = () => {
  // Fix state types
  const [subject, setSubject] = useState<string>("");
  const [grade, setGrade] = useState<string>("S");
  const [subjects, setSubjects] = useState<Array<{name: string; grade: string}>>([]);
  const [cgpa, setCGPA] = useState<number>(0.0);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showARMSForm, setShowARMSForm] = useState<boolean>(false);
  const [armsUsername, setArmsUsername] = useState<string>("");
  const [armsPassword, setArmsPassword] = useState<string>("");
  const [fetchMessage, setFetchMessage] = useState<string>("");
  const navigate = useNavigate();

  const gradePoints = { S: 10, A: 9, B: 8, C: 7, D: 6, E: 5 };

  useEffect(() => {
    fetchUserData();
  }, []);

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
        setUserData({ id: userDoc.id, ...data });

        if (data.grades) {
          setSubjects(data.grades);
          calculateCGPA(data.grades);
        }
        
        // Set fetch message from Firestore if it exists
        if (data.fetchMessage) {
          setFetchMessage(data.fetchMessage);
        }
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleAddSubject = async () => {
    if (subject.trim() === "") return;

    const newSubject = { name: subject, grade };
    const updatedSubjects = [...subjects, newSubject];

    setSubjects(updatedSubjects);
    setSubject("");
    setGrade("S");

    calculateCGPA(updatedSubjects);

    if (userData) {
      try {
        const userRef = doc(db, "users", userData.id);
        await updateDoc(userRef, {
          grades: arrayUnion(newSubject),
        });
      } catch (err) {
        console.error("Error updating user data:", err);
      }
    }
  };

  const calculateCGPA = async (updatedSubjects: Array<{name: string; grade: string}>) => {
    if (updatedSubjects.length === 0) {
      setCGPA(0.0);
      return;
    }

    const totalPoints = updatedSubjects.reduce((acc, subj) => acc + gradePoints[subj.grade], 0);
    const calculatedCGPA = totalPoints / updatedSubjects.length;
    setCGPA(calculatedCGPA);

    if (userData) {
      try {
        const userRef = doc(db, "users", userData.id);
        await updateDoc(userRef, { cgpa: calculatedCGPA });
      } catch (err) {
        console.error("Error updating CGPA in Firestore:", err);
      }
    }
  };

  const handleARMSSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = "Fetching grades from ARMS...";
    setFetchMessage(message);
    
    if (userData) {
      try {
        const userRef = doc(db, "users", userData.id);
        await updateDoc(userRef, {
          armsUsername: armsUsername,
          armsPassword: armsPassword,
          fetchMessage: message // Save fetch message to Firestore
        });
      } catch (err) {
        console.error("Error saving ARMS credentials:", err);
        const errorMsg = "Error saving ARMS credentials";
        setFetchMessage(errorMsg);
        // Save error message to Firestore
        if (userData) {
          const userRef = doc(db, "users", userData.id);
          await updateDoc(userRef, {
            fetchMessage: errorMsg
          });
        }
      }
    }

    // TODO: Implement ARMS integration logic here
    setShowARMSForm(false);
    setArmsUsername("");
    setArmsPassword("");
  };

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">CGPA Calculator</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Enter your subjects and select the corresponding grades to calculate your CGPA.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white/5 rounded-xl p-8 shadow-lg">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full md:w-2/3 p-3 border bg-white/10 border-gray-300 rounded-lg text-white"
              placeholder="Subject Name"
              required
            />
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full md:w-1/3 p-3 border bg-white/10 border-gray-300 rounded-lg text-white appearance-none"
            >
              {Object.keys(gradePoints).map((g) => (
                <option key={g} value={g} className="bg-gray-900 text-white">
                  {g}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddSubject}
            className="mt-4 w-full md:w-auto px-6 py-3 bg-teal-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            Add Subject
          </button>
          <div className="mt-4 flex flex-col gap-4">
            <button
              onClick={() => setShowARMSForm(true)}
              className="w-full md:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Fetch from ARMS
            </button>

            {showARMSForm && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <form onSubmit={handleARMSSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={armsUsername}
                    onChange={(e) => setArmsUsername(e.target.value)}
                    className="w-full p-3 border bg-white/10 border-gray-300 rounded-lg text-white"
                    placeholder="ARMS Username"
                    required
                  />
                  <input
                    type="password"
                    value={armsPassword}
                    onChange={(e) => setArmsPassword(e.target.value)}
                    className="w-full p-3 border bg-white/10 border-gray-300 rounded-lg text-white"
                    placeholder="ARMS Password"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}

            {fetchMessage && (
              <div className="text-white text-center p-4 bg-gray-700/50 rounded-lg">
                {fetchMessage}
              </div>
            )}
          </div>
          <div className=" text-center">
            <h2 className="text-3xl font-bold text-white">
              Your CGPA: {cgpa.toFixed(2)}
            </h2>
          </div>
        </div>

        <div>
          <h2 className="text-2xl text-white font-bold mb-4">Subjects</h2>
          <ul className="space-y-2">
            {subjects.map((subj, index) => (
              <SubjectItem key={index} subj={subj} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculatorPage;
