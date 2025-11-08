import { useState, useEffect } from "react";

function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  useEffect(() => {
    if (user) {
      // Kiểm tra nếu người dùng mới không trùng với người hiện có
      const isDuplicate = users.some(
        (u) => u.name === user.name && u.username === user.username
      );
      if (!isDuplicate) {
        setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
        onAdded();
      } else {
        alert("Người dùng đã tồn tại!");
      }
    }
  }, [user]);

  const handleEditChange = (field, value) => {
    if (["street", "suite", "city"].includes(field)) {
      setEditing({ ...editing, address: { ...editing.address, [field]: value } });
    } else {
      setEditing({ ...editing, [field]: value });
    }
  };

  const editUser = (user) => {
    setEditing({ ...user, address: { ...user.address } }); // Deep Copy
  };

  const saveUser = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === editing.id ? editing : u))
    );
    setEditing(null);
  };

  const removeUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address.city}</td>
              <td>
                <button onClick={() => editUser(u)}>Sửa</button>
                <button onClick={() => removeUser(u.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <div>
          <h4>Sửa người dùng</h4>
          <label>Name: </label>
          <input
            type="text"
            value={editing.name}
            onChange={(e) => handleEditChange("name", e.target.value)}
          /><br />
          <label>Username: </label>
          <input
            type="text"
            value={editing.username}
            onChange={(e) => handleEditChange("username", e.target.value)}
          /><br />
          <button onClick={saveUser}>Lưu</button>
          <button onClick={() => setEditing(null)}>Hủy</button>
        </div>
      )}
    </div>
  );
}

export default ResultTable;