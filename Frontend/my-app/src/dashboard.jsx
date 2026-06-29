import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const getFriends = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/friends/getFriend", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setFriends(data.friends);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      }
    };

    getUser();
    getFriends();
  }, []);

  const addFriend = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/friends/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Friend Added Successfully");

      setPhoneNumber("");
      setShowAddFriend(false);

      getFriends(); // Refresh sidebar
    } catch (err) {
      console.log(err);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#2563EB] p-6">
      {/* Background Blur */}

      <div className="fixed top-[-120px] left-[-120px] h-80 w-80 rounded-full bg-pink-500/30 blur-[120px]" />

      <div className="fixed bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-cyan-400/30 blur-[120px]" />

      <div className="relative z-10 h-[92vh] rounded-[35px] border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl flex overflow-hidden">
        {/* ================= SIDEBAR ================= */}

        <div className="w-80 border-r border-white/10 flex flex-col">
          {/* Logo */}

          <div className="p-6 border-b border-white/10">
            <h1 className="text-3xl font-black text-white">StaySync</h1>

            <p className="text-white/60 text-sm mt-1">Real-Time Chat</p>
          </div>

          {/* User Card */}

          <div className="m-5 rounded-2xl bg-white/10 p-5 border border-white/10">
            <h2 className="text-white text-xl font-semibold">
              {user?.username}
            </h2>

            <p className="text-cyan-300 mt-2">📱 {user?.phoneNumber}</p>
          </div>

          {/* Search */}

          <div className="p-5">
            <input
              placeholder="Search Friend..."
              className="w-full rounded-xl bg-white/10 border border-white/20 p-3 text-white placeholder:text-white/40 outline-none"
            />
          </div>

          {/* Friend List */}

          {friends.length === 0 ? (
            <p className="text-white/60 text-center mt-5">
              No friends added yet.
            </p>
          ) : (
            friends.map((item) => (
              <div
                key={item._id}
                className="mb-3 rounded-xl bg-white/10 p-4 cursor-pointer hover:bg-white/20 transition"
              >
                <h2 className="text-white font-semibold">
                  🟢 {item.friend.username}
                </h2>

                <p className="text-cyan-300 text-sm">
                  {item.friend.phoneNumber}
                </p>
              </div>
            ))
          )}

          {/* Logout */}

          <div className="p-5">
            <button
              onClick={() => setShowAddFriend(true)}
              className="w-full rounded-xl bg-gradient-to-r from-purple-700 to-blue-600 py-3 text-white font-semibold hover:scale-105 transition"
            >
              + Add Friend
            </button>
          </div>
          <button
              onClick={logoutUser}
              className="w-full rounded-xl bg-gradient-to-r from-purple-700 to-blue-600 py-3 text-white font-semibold hover:scale-90 transition"
            >
              Log Out
            </button>
        </div>

        {/* ================= CHAT ================= */}

        <div className="flex-1 flex flex-col">
          {/* Header */}

          <div className="h-24 border-b border-white/10 flex items-center px-8">
            <h2 className="text-3xl text-white font-bold">Select a Friend</h2>
          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-8">
            <div className="mb-5 w-fit rounded-2xl bg-white/20 px-5 py-3 text-white">
              Hello 👋
            </div>

            <div className="ml-auto mb-5 w-fit rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-white">
              Hi ❤️
            </div>
          </div>

          {/* Input */}

          <div className="border-t border-white/10 p-5 flex gap-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white outline-none placeholder:text-white/50"
            />

            <button className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 text-white font-semibold hover:scale-105 transition">
              Send
            </button>
            
          </div>
          
        </div>
      </div>

      {showAddFriend && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="w-[420px] rounded-3xl bg-[#1e1e2f] border border-white/10 p-8">
            <h1 className="text-3xl font-bold text-white text-center mb-6">
              Add Friend
            </h1>

            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/10 p-4 text-white outline-none placeholder:text-white/50"
            />

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowAddFriend(false)}
                className="flex-1 rounded-xl bg-gray-600 py-3 text-white"
              >
                Cancel
              </button>

              <button
                onClick={addFriend}
                className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-white"
              >
                Add Friend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
