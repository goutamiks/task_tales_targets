import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; // Import useSnackbar hook
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";

const LoginPage = ({ onLogin, setLoginDetails }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Email is required");
      return;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      return;
    }

    if (password.trim().length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json(); // Parse JSON response

      // Extract user details from the response
      const { user } = data;

      setLoginDetails(user);

      // Display success message
      enqueueSnackbar("You Have Logged In Successfully", {
        variant: "success",
      });

      // Assuming login is successful, redirect or perform other actions
      onLogin();

      // Assuming login is successful, navigate to the home page
      navigate("/home");
    } catch (error) {
      setError("Invalid Email or Password");

      // Display error message
      enqueueSnackbar("Invalid Email or Password", { variant: "error" });
    }
  };

  const handleChangePassword = (e) => {
    const { value } = e.target;
    if (value.length > 6) {
      setPassword(value.substring(0, 6)); // Limit password to 6 characters
      setPasswordError("Password must be at most 6 characters long");
    } else {
      setPassword(value);
      setPasswordError(""); // Clear any previous error message
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "300px",
          p: 4,
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handleChangePassword}
            error={!!passwordError}
            helperText={passwordError}
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" component="span">
            Don't have an account?{" "}
          </Typography>
          <Link component={RouterLink} to="/register">
            Register now
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
