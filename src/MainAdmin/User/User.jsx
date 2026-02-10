import { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {url}= useContext(AdminContext);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${url}/api/user/all`);

      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.log(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete User
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${url}/api/user/delete/${id}`
      );

      if (res.data.success) {
        alert("User Deleted ✅");
        fetchUsers(); // refresh
      } else {
        alert(res.data.message || "Delete failed ❌");
      }
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="center-text">Loading users...</p>;

  return (
    <div className="user-page">
      <h2 className="user-title">👤 All Users</h2>

      {users.length === 0 ? (
        <p className="center-text">No users found</p>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <div className="user-card" key={user._id}>
              <p><b>ID:</b> {user._id}</p>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>

              <button
                className="delete-btn"
                onClick={() => deleteUser(user._id)}
              >
                ❌ Delete User
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
