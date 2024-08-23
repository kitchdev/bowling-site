"use client";
import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { signIn } from "next-auth/react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import LoadingDots from "@/app/[lang]/components/LoadingDots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (formData: any) => {
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      // @ts-ignore
    }).then(({ error }) => {
      if (error) {
        setLoading(false);
        toast.error(error);
      } else {
        router.refresh();
      }
    });
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "#013162" };

  const btnstyle = loading
    ? { margin: "8px 0", border: "gray", bg: "gray", height: "36.5px" }
    : { margin: "8px 0" };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      align="center"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Paper align="center" elevation={10} style={paperStyle}>
        <Grid item xs={6} md={10} pb={1}>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
          <TextField
            label="Email"
            placeholder="Enter email"
            variant="outlined"
            fullWidth
            required
            {...register("email")}
          />
        </Grid>
        <Grid item xs={6} md={10} pb={1}>
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="outlined"
            fullWidth
            required
            {...register("password")}
          />
        </Grid>
        <Grid item xs={6} md={10} pb={1}>
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            pb={5}
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
            style={btnstyle}
            fullWidth
          >
            {loading ? <LoadingDots /> : "Sign In"}
          </Button>
        </Grid>
        <Grid item xs={6} md={10} pb={1}>
          <Box align="center">
            <Typography pb={5}>
              <Link href="/forgot-password">Forgot password?</Link>
            </Typography>
            <Typography>{`Don't have an account?`}</Typography>
            <Link align="center" href="register">
              Sign Up
            </Link>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
}
