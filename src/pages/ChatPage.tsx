import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase"; 
import { 
    collection, query, where, orderBy, addDoc, serverTimestamp, onSnapshot, getDocs, deleteDoc, doc 
} from "firebase/firestore";

const ChatPage = () => {
    const { communityId } = useParams();  
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user from localStorage
    useEffect(() => {
        const fetchUserData = async () => {
            const userEmail = localStorage.getItem("userEmail");
            const userName = localStorage.getItem("fullname"); 

            if (!userEmail) {
                console.log("No user email found. Redirecting to login...");
                navigate("/login");
                return;
            }

            setUser({
                email: userEmail,
                displayName: userName || "Anonymous",
            });
        };

        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        if (!communityId) {
            console.error("Community ID is missing!");
            return;
        }

        const messagesRef = collection(db, "messages");
        const q = query(
            messagesRef,
            where("communityId", "==", communityId), 
            orderBy("timestamp", "asc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(fetchedMessages);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [communityId]);

    const sendMessage = async () => {
        if (!newMessage.trim()) {
            alert("Message cannot be empty!");
            return;
        }
        if (!user) {
            alert("You must be logged in to send a message!");
            navigate("/login");
            return;
        }

        try {
            await addDoc(collection(db, "messages"), {
                communityId,
                text: newMessage,
                senderName: user.displayName, 
                senderEmail: user.email, 
                timestamp: serverTimestamp(),
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Leave Community Function
    const leaveCommunity = async () => {
        if (!user) {
            alert("You must be logged in to leave the community!");
            return;
        }

        try {
            const communityMembersRef = collection(db, "community_members");
            const q = query(
                communityMembersRef,
                where("email", "==", user.email),
                where("communityId", "==", communityId)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docId = querySnapshot.docs[0].id; 
                await deleteDoc(doc(db, "community_members", docId)); 

                alert("You have left the community.");
                navigate("/"); 
            } else {
                navigate("/community");
            }
        } catch (error) {
            console.error("Error leaving community:", error);
            alert("Failed to leave community.");
        }
    };

    return (
        <div className="p-4 pt-10">
            <h1 className="text-2xl text-white font-bold pb-4">Community Chat</h1>

            {/* Leave Community Button */}
            <button 
                onClick={leaveCommunity} 
                className="bg-red-500 text-white px-4 py-2 mb-4 rounded-md"
            >
                Leave Community
            </button>

            {/* Chat Messages Box */}
            <div className="border p-4 bg-white/10 h-96 overflow-y-auto bg-gray-100 rounded-md">
                {loading ? (
                    <div className="animate-pulse space-y-2">
                        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-6 bg-gray-300 rounded w-5/6"></div>
                    </div>
                ) : messages.length > 0 ? (
                    messages.map((msg) => (
                        <div key={msg.id} className={`p-2 border-b rounded-md my-1 ${msg.senderEmail === user?.email ? "bg-blue-100 text-right" : "bg-white text-left"}`}>
                            <p className="text-sm font-bold text-blue-600">{msg.senderName}</p>
                            <p className="text-black">{msg.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet.</p>
                )}
            </div>

            {/* Input and Send Button */}
            <div className="mt-4 flex">
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    className="border p-2 flex-grow rounded-md"
                    placeholder="Type your message..."
                />
                <button 
                    onClick={sendMessage} 
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
