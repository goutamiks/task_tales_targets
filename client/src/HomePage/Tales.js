import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import "../dairy.css";

const Tales = () => {
  const [appData, setAppData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    debugger;
    try {
      const response = await fetch(
        `http://localhost:5002/api/auth/getTales?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAppData(data);
    } catch (error) {
      enqueueSnackbar("Failed to fetch previous data", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5002/api/auth/tales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputValue, userId }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      // Assuming API call is successful, update state or perform other actions
      setAppData((prevData) => [...prevData, inputValue]);
      setInputValue(""); // Clear the input field

      // Display success message
      enqueueSnackbar("Your Dairy Entry Created Successful", {
        variant: "success",
      });

      // Fetch updated data after submitting
      fetchData();
    } catch (error) {
      // Display error message
      enqueueSnackbar("Failed to Created the Dairy Entry", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <header>
        <h1>📖 My Personal Diary</h1>
      </header>
      <main className="container">
        <form onSubmit={handleSubmit}>
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Here write your diary...."
            multiline
            rows={10}
            maxRows={10}
            autoFocus
            required
            fullWidth // Added to make the TextField take full width
            style={{
              marginBottom: "1rem",
              borderRadius: "8px",
              padding: "0.5rem",
            }} // Added styles for TextField
            InputProps={{
              // Added styles for input area of TextField
              style: { fontSize: "1rem" },
              autoComplete: "off",
            }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              style={{ width: "200px", marginBottom: "1rem" }} // Set the desired width and margin bottom
            >
              Submit
            </Button>
          </div>
        </form>
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #ccc",
            margin: "2rem 0",
          }}
        />
        <h1 className="diary-history--title">My History of Diary</h1>
        <div id="diary-history">
          {appData.map((entry, index) => (
            <div key={index} className="diary-history--entry">
              {entry?.inputValue}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Tales;
