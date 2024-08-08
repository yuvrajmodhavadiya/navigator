import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ""

export default function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(() => {
    const storedData = localStorage.getItem("userdata");
    return storedData ? JSON.parse(storedData) : [];
  });

  const handleform = (e) => {
    e.preventDefault();
    setUser([...user, { name: name, password: password }]);
    console.log(name, password);
    setName("");
    setPassword("");
  };
  const navigate = useNavigate();
  const home = () => {
    navigate("/about", { state: { Data: user } });
  };

  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(user));
  });
  
  return (
    <div>
      <form onSubmit={handleform}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button>Submit</button>
      </form>
      <br />
      <button onClick={home}>click for about page</button>
    </div>
  );
}
