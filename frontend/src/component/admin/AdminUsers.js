import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/adminTable.css'

export default function AdminUsers() {

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await axios.get(
      "http://localhost:8083/admin/users"
    );

    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {

    if (!window.confirm("Delete User?")) return;

    await axios.delete(
      `http://localhost:8083/admin/users/${id}`
    );

    loadUsers();

  };

  return (
    <div className="admin-page">

      <h1>👨‍🎓 Students</h1>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (
            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.code}</td>

              <td>

                <button
                  onClick={() =>
                    deleteUser(user.id)
                  }
                >
                  🗑 Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}