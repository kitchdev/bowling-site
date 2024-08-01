"use client";
import React from "react";
import {
  Box,
  Checkbox,
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
import { Locale } from "@/i18n-config";

export default function Login({ lang }: { lang: Locale }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (formData: any) => {
    console.log(typeof formData.password);
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
    <Grid component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
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
        <Box align="center">
          <Typography pb={5}>
            <Link href="#">Forgot password?</Link>
          </Typography>
          <Typography>{`Don't have an account?`}</Typography>
          {/* this needs to be localized, to function with /en/ /fr/ */}
          <Link align="center" href={`/${lang}/register`}>
            Sign Up
          </Link>
        </Box>
      </Paper>
    </Grid>
  );
}
