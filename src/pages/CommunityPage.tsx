import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, requestNotificationPermission } from "../firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

const CommunityPage = () => {
    const [communities, setCommunities] = useState([]);
    const [joinedCommunities, setJoinedCommunities] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "communities"));
                setCommunities(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching communities: ", error);
            }
        };

        const fetchUser = async () => {
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
                    const userData = { id: userDoc.id, ...userDoc.data() };
                    setUser(userData);
                    fetchJoinedCommunities(userData.id);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchJoinedCommunities = async (userId) => {
            try {
                const q = query(collection(db, "community_members"), where("userId", "==", userId));
                const querySnapshot = await getDocs(q);
                setJoinedCommunities(querySnapshot.docs.map(doc => doc.data().communityId));
            } catch (error) {
                console.error("Error fetching joined communities: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommunities();
        fetchUser();
    }, [navigate]);

    const handleCommunityClick = async (communityId) => {
        if (!user) {
            alert("Please log in first!");
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
            alert("You must enable notifications to receive updates.");
            requestNotificationPermission(user.id);
            return;
        }

        await requestNotificationPermission(user.id);

        if (joinedCommunities.includes(communityId)) {
            navigate(`/chat/${communityId}`);
        } else {
            try {
                await addDoc(collection(db, "community_members"), {
                    userId: user.id,
                    communityId
                });
                setJoinedCommunities((prev) => [...prev, communityId]);
                navigate(`/chat/${communityId}`);
            } catch (error) {
                console.error("Error joining community: ", error);
            }
        }
    };

    return (
        <div className="p-4 pt-10">
            <h1 className="text-2xl text-white font-bold">Join a Community</h1>
            <ul className="mt-4">
                {loading ? (
                    [...Array(3)].map((_, index) => (
                        <li key={index} className="p-3 border rounded-lg mb-2 animate-pulse bg-gray-700 h-16"></li>
                    ))
                ) : (
                    communities.map((comm) => (
                        <li key={comm.id} className="p-3 border rounded-lg mb-2">
                            <h2 className="text-lg text-white font-semibold">{comm.name}</h2>
                            <button 
                                onClick={() => handleCommunityClick(comm.id)} 
                                className={`mt-2 px-4 py-2 rounded ${
                                    joinedCommunities.includes(comm.id) ? "bg-green-500" : "bg-blue-500"
                                } text-white`}
                            >
                                {joinedCommunities.includes(comm.id) ? "Enter" : "Join"}
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default CommunityPage;
