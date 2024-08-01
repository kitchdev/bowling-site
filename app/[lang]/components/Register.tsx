"use client";
import { useState, useRef } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LoadingDots from "@/app/[lang]/components/LoadingDots";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type FormValues = {
  name: string;
  email: string;
  password: string;
  cpassword: string;
  phone_number: string;
};

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);

  const router = useRouter();

  let password: string;

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    name: Yup.string().required("Name is required"),
    phone_number: Yup.string().matches(
      phoneRegExp,
      "Phone number is not valid"
    ),
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

  const handleFormSubmit = async (formData: any) => {
    let response: any;
    const { name, email, password, phone_number } = formData;
    setLoading(true);
    try {
      response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          phone_number,
        }),
      });
    } catch (err: unknown) {
      console.log(err);
      toast(err);
    }
    if (response?.ok) {
      const data = await response.json();
      toast.success("user successfully created");
      router.push("/");
    } else {
      const errMessage = await response?.json();
      console.error(`error code: ${response?.status}`);
      toast.error(errMessage.error);
      setLoading(false);
      reset();
    }
  };

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

  const paperStyle = {
    padding: 20,
    height: "75vh",
    width: 450,
    margin: "120px auto 0 auto",
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
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      align="center"
    >
      <Paper align="center" elevation={10} style={paperStyle}>
        <Grid item xs={4} md={10} pb={1}>
          <h2>Sign up with Valois Bowling</h2>
          <TextField
            label="Email"
            placeholder="Enter email"
            variant="outlined"
            type="email"
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          >
            Email
          </TextField>
        </Grid>
        <Grid item xs={4} md={10} pb={1}>
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
        <Grid item xs={4} md={10} pb={1}>
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
        <Grid item xs={4} md={10} pb={1}>
          <TextField
            label="Name"
            placeholder="Enter name"
            variant="outlined"
            type="text"
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          >
            Name
          </TextField>
        </Grid>
        <Grid item xs={4} md={10} pb={1}>
          <TextField
            label="Phone"
            placeholder="Enter phone number"
            variant="outlined"
            type="text"
            fullWidth
            required
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
            {...register("phone_number")}
          >
            Phone Number
          </TextField>
        </Grid>

        <Grid xs={4} md={10} pt={3}>
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
          <Typography variant="caption" display="block">
            A validation email will be sent to your newly registered user
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}
