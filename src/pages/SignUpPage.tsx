import React, { useState } from 'react';
import { UserRound, KeyRound, Mail, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, provider,db, signInWithPopup,  createUserWithEmailAndPassword } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    registrationNumber: '',
    email: '',
    department: '',
    password: ''
  });


    
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isGoogleSignedIn) {
        // If user signed in with Google, update their details in Firestore
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, "users", user.uid), {
            fullName: formData.fullName,
            registrationNumber: formData.registrationNumber,
            email: formData.email,
            department: formData.department,
            password: formData.password,
            createdAt: new Date()
          }, { merge: true }); // Merge to update existing user data
  
          navigate('/login');
        }
      } 
      else{


          const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
          const user = userCredential.user;
      
          // Save user data in Firestore
          await setDoc(doc(db, "users", user.uid), {
            fullName: formData.fullName,
            registrationNumber: formData.registrationNumber,
            email: formData.email,
            department: formData.department,
            password: formData.password,
            createdAt: new Date()
          });
      
          navigate('/login'); // Redirect to login page
        }
      }
        catch (error) {
          console.error("Error signing up:", error);
        }
  };
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Success:", result.user);
      setFormData({
        ...formData,
        fullName: result.user.displayName || '',
        email: result.user.email || '',
      });
      setIsGoogleSignedIn(true); // Hide Google Sign-In button
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Sign Up</h1>
          <p className="text-gray-500 text-sm">Create your account</p>
        </div>

        {/* Manual Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
            <div className="relative">
              <UserRound className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Registration Number</label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200"
                placeholder="e.g., 19YYDPRR"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200"
                placeholder="you@example.com"
                required
                disabled={isGoogleSignedIn} // Disable if signed in with Google
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Department</label>
            <div className="relative">
              <Building className="absolute left-4 top-3 text-gray-400" />
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 bg-white appearance-none"
                required
              >
                <option value="">Select department</option>
                <option value="CS">Computer Science</option>
                <option value="IT">Information Technology</option>
                <option value="ECE">Electronics & Communication</option>
                <option value="EEE">Electrical & Electronics</option>
                <option value="MECH">Mechanical Engineering</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Password</label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            Create Account
          </button>

          <div className="text-center text-gray-400 my-3">OR</div>
          <div className="text-center">
            {!isGoogleSignedIn && (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2 mb-4"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Sign in with Google
              </button>
            )}

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
            >
              Already have an account? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
