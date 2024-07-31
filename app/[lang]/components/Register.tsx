"use client";
import { useState, useRef } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import LoadingDots from "@/app/[lang]/components/LoadingDots";

export default function Register() {
  const passValEl = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isPassValid, setIsPassValid] = useState(false);
  const [currPassword, setCurrPassword] = useState("");
  const [isPassVerifActive, setPassVerifActive] = useState(false);

  const router = useRouter();
  const { register, handleSubmit, watch } = useForm();

  const handleFormSubmit = async (formData: any) => {
    const { name, email, password, phone_number } = formData;
    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        phone_number,
      }),
    });
    console.log(response);
  };

  const handleCurrentPassword = (event, value, reason) => {
    setCurrPassword(e.target.value);
  };

  const handlePasswordVerif = (password) => {
    console.log(currPassword);
    console.log(password);
    if (handlePasswordVerif === currPassword) {
      setIsPassValid(true);
    }
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const btnstyle = loading
    ? {
        margin: "8px 0",
        border: "gray",
        bg: "gray",
        height: "36.5px",
      }
    : { margin: "8px 0" };
  return (
    <Grid component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center" pb={5}>
          <h2>Register</h2>
          <TextField
            pb={2}
            label="Email"
            placeholder="Enter email"
            variant="outlined"
            fullWidth
            required
            {...register("email")}
          >
            Email
          </TextField>
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            fullWidth
            required
            {...register("password")}
          >
            Password
          </TextField>
          <TextField
            label="Verify Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            required
            error={!isPassValid}
            {...register("verifyPassword")}
          >
            Password
          </TextField>
          <TextField
            label="Name"
            placeholder="Enter name"
            variant="outlined"
            fullWidth
            required
            {...register("name")}
          >
            Name
          </TextField>
          <TextField
            label="Phone"
            placeholder="Enter phone number"
            variant="outlined"
            fullWidth
            required
            {...register("phone_number")}
          >
            Phone Number
          </TextField>
        </Grid>
        <Box>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
            style={btnstyle}
            fullWidth
          >
            {loading ? <LoadingDots /> : "Sumbit"}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
