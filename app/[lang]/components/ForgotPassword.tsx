"use client";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import LoadingDots from "@/app/[lang]/components/LoadingDots";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  email: string;
};

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const handleFormSubmit = async (formData: FormValues) => {
    let response: any;
    setLoading(true);
    console.log(formData.email);
    const { email } = formData;
    try {
      response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });
    } catch (err: unknown) {
      console.log(err);
      toast(err);
    }
    console.log(response);
    if (response?.ok) {
      const data = await response.json();
      toast.success("Reset password email sent successfully");
      router.push("/");
    } else {
      const errMessage = await response?.json();
      console.error(`error code: ${errMessage?.status || errMessage?.error}`);
      toast.error(errMessage?.error || errMessage);
      setLoading(false);
      reset();
    }
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
          <h2>Forgot Password</h2>
          <Typography variant="caption" display="block">
            {`Please enter your email, and we'll send you a reset password link`}
          </Typography>
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
          <Button
            pb={5}
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
            style={btnstyle}
            fullWidth
          >
            {loading ? <LoadingDots /> : "Submit"}
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ForgotPassword;
