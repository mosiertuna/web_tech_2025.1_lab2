import { useState } from "react";

function AddUser({ onAdd }) {
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      setUser({ ...user, [id]: value });
    }
  };

  const handleAdd = () => {
    if (!user.name || !user.username) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user); // Gửi dữ liệu lên App
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: "",
    });
    setAdding(false);
  };

  return (
    <div>
      <button onClick={() => setAdding(true)}>Thêm</button>
      {adding && (
        <div>
          <h4>Thêm người dùng</h4>
          <label>Name: </label>
          <input id="name" type="text" value={user.name} onChange={handleChange} /><br />
          <label>Username: </label>
          <input id="username" type="text" value={user.username} onChange={handleChange} /><br />
          <label>Email: </label>
          <input id="email" type="text" value={user.email} onChange={handleChange} /><br />
          <button onClick={handleAdd}>Thêm</button>
          <button onClick={() => setAdding(false)}>Hủy</button>
        </div>
      )}
    </div>
  );
}

export default AddUser;