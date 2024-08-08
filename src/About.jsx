import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const location = useLocation();
  const home = () => {
    navigate("/");
  };

  const initialdata = location.state?.Data || [];
  const [data, setData] = useState(initialdata);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editpassword, setEditPassword] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("userdata");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const deletedata = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem("userdata", JSON.stringify(updatedData));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditName(data[index].name);
    setEditPassword(data[index].password);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUsers = data.map((user, index) =>
      index === editIndex ? { name: editName, password: editpassword } : user
    );
    
    setData(updatedUsers);
    localStorage.setItem("userdata", JSON.stringify(updatedUsers));
    setEditIndex(null);
    setEditName("");
    setEditPassword("");
  };

  return (
    <div>
      <button onClick={home}>click for home page</button>
      <table>
        <thead>
          <tr>
            <td>sr no</td>
            <td>name</td>
            <td>Password</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((ele, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{ele.name}</td>
              <td>{ele.password}</td>
              <td>
                <button onClick={() => handleEdit(index)}>edit</button>
                <button onClick={() => deletedata(index)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editIndex !== null && (
        <div>
          <h2>Edit User</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Edit Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Edit password"
              value={editpassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
            <br />
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditIndex(null)}>
              Cancel
            </button>{" "}
          </form>
        </div>
      )}
    </div>
  );
}
