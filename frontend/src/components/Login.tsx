import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api";
import { TextField, Button, Box, Typography } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      // 1. Get the token
      const loginRes = await api.post("login/", { username, password });
      localStorage.setItem("token", loginRes.data.token);

      // 2. Find out who we are (role)
      const meRes = await api.get("me/");
      const role = meRes.data.role;

      // 3. Route based on role
      if (role === "instructor") {
        navigate("/instructor");
      } else {
        navigate("/student");
      }
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <Box sx={{ maxWidth: 320, mx: "auto", mt: 8, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5">Login</Typography>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}

export default Login;