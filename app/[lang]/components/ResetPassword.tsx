"use client";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import LoadingDots from "@/app/[lang]/components/LoadingDots";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type FormValues = {
  password: string;
  cpassword: string;
};

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);

  const router = useRouter();
  const path = usePathname();
  const token = path.split("reset-password/")[1];

  let password: string;

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
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

  password = watch("password", "");

  const handleClickShowPassword = (type: string) => {
    type === "password"
      ? setShowPassword(!showPassword)
      : setShowCpassword(!showCpassword);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (formData: FormValues) => {
    let response: any;
    setLoading(true);
    const { password } = formData;
    try {
      response = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token,
          password,
        }),
      });
    } catch (err: unknown) {
      console.log(err);
      toast(err);
    }
    if (response?.ok) {
      const data = await response.json();
      toast.success("Password successfully reset");
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
    height: "75vh",
    width: 450,
    margin: "120px auto 0 auto",
  };
  const avatarStyle = { backgroundColor: "#013162" };

  const btnstyle = loading
    ? {
        margin: "8px 0",
        border: "gray",
        bg: "gray",
        height: "36.5px",
      }
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
          <h2>Reset Password</h2>
          <Typography variant="caption" display="block">
            Please enter your new password
          </Typography>
          <TextField
            label="Password"
            placeholder="Enter password"
            autoComplete="current-password"
            variant="outlined"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("password")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("password")}
          >
            Password
          </TextField>
        </Grid>
        <Grid item xs={6} md={10} pb={1}>
          <TextField
            label="Verify Password"
            placeholder="Enter password"
            variant="outlined"
            fullWidth
            required
            type={showCpassword ? "text" : "password"}
            error={!!errors.cpassword}
            helperText={errors.cpassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("cpassword")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showCpassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("cpassword")}
          >
            Password
          </TextField>
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

export default ResetPassword;
