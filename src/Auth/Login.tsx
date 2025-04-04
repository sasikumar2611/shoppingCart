import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  ArrowUpward,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
// import CentralizedTextField from "../CentralizedComponents/CentralizedTextField";
// import { useForm } from "react-hook-form";
import gifVideo from "../assets/Stay Home GIF by PLAYMOBIL.gif";
import { v4 as uuidv4 } from "uuid";
// import {
//   forgetPassword,
//   login,
//   updatePassword,
//   verifyOTP,
// } from "../service/api-collection.Service";
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import signupImg from "../assets/signup.gif";
// import f2 from "../assets/forget men in black GIF by Animation Domination High-Def.gif";
import forgetPassImg from "../assets/forget men in black GIF by Animation Domination High-Def.gif";

import { useForm } from "react-hook-form";
import CentralizedTextInput from "../CentralizedComponents/inputs/CentralizedTextInput";
import { addUserList, signUpUser } from "../store/action/product";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store/Store";
interface signInInputs {
  password?: string;
  email?: string;
}
interface signUpInputs {
  name?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
}
interface forgetInputs {
  password?: string;
  email?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}
const LoginPage = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm();
  const signInForm = useForm<signInInputs>();
  const signUpForm = useForm<signUpInputs>();
  const forgetPasswordForm = useForm<forgetInputs>();
  const navigate = useNavigate();
  const [isSignInActive, setIsSignInActive] = useState(true);
  const [_isForgetActive, setIsForgetActive] = useState(false);
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const handleSignIn = () => {
    signInForm.reset();
    setIsSignInActive(false);
    setIsForgetActive(true);
  };
  const handleForget = () => {
    signUpForm.reset();
    setIsSignInActive(true);
    // setIsSignIn(true);
    setIsForgetActive(false);
    forgetPasswordForm.reset();
  };
  const handleUpForget = () => {
    signInForm.reset();
    setIsSignInActive(true);
    setIsSignUpActive(true);
    setIsForgetActive(false);
  };
  const handleSignUp = () => {
    forgetPasswordForm.reset();
    setOtpSent(false);
    setIsOtpVerified(false);
    setIsSignInActive(true);
    setIsForgetActive(false);
    setIsSignUpActive(false);
  };

  // const dispatch = useDispatch<AppDispatch>();
  const userRole = localStorage.getItem("userRole");
  console.log(userRole);

  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // const onSubmit = async (data: any) => {
  //   console.log(data);
  //   if (isSignInActive) {
  //     const newUser = {
  //       id: uuidv4(),
  //       Email: data.email,
  //       username: "",
  //       image: "",
  //     };
  //     // setLoggedInUser((prevUser) => [...prevUser, newUser]);
  //     try {
  //       const { data: existingUsers } = await axios.get(UserList_API_URL);
  //       console.log(data);
  //       const userExists = existingUsers.some((chat: any) =>
  //         chat.userList.some((user: any) => user.Email === newUser.Email)
  //       );
  //       setUserList(existingUsers.userList);
  //       console.log(userExists);
  //       if (userExists) {
  //         console.log("User already exists. Not adding again.");
  //         return;
  //       } else {
  //         const newuser = {
  //           ...existingUsers.userList,
  //           newUser,
  //         };
  //         await axios.post(UserList_API_URL, { userList: [newuser] });
  //       }
  //     } catch (error) {
  //       console.error("Error creating new chat:", error);
  //     }
  //     navigate("/Pages/Chat");
  //   } else {
  //     // if (!otpSent) {
  //     //   sendOtp(data.email);
  //     // } else if (!isOtpVerified) {
  //     //   verifyOtp(data.email, data.otp);
  //     // } else {
  //     //   changePassword(data.email, data.newPassword);
  //     // }
  //     return;
  //   }
  //   navigate("/Pages/Chat");
  // };
  const onSignInSubmit = async (data: signInInputs) => {
    console.log(data);
    try {
      const resposne = await signUpUser(data);
      if (!!userRole && resposne?.status === 200) {
        userRole === "Admin"
          ? navigate("/Pages/Dashboard")
          : navigate("/Pages/Products");
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
    signUpForm.reset();
  };
  const onSignUpSubmit = async (data: signUpInputs) => {
    const newUser: any = {
      id: uuidv4(),
      Email: data.email,
      Username: data.name,
      Password: data.password,
      role:
        data.name === "Sasi kumar" &&
        data.email === "sasikumar26112001@gmail.com"
          ? "Admin"
          : "User",
      isLoggedin: false,
      Image: "",
    };

    try {
      const response = await addUserList(newUser);
      if (response?.status === 200) {
        signUpForm.reset();
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };
  const onForgetSubmit = (data: forgetInputs) => {
    console.log(data);
    //  if (!otpSent) {
    //     sendOtp(data);
    //   } else if (!isOtpVerified) {
    //     verifyOtp(data.email, data.otp);
    //   } else {
    //     changePassword(data.email, data.newPassword);
    //   }
  };
  const signInValidation = {
    email: {
      required: "Employee Code is required",
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 5,
        message: "Password must be at least 5 characters long",
      },
    },
  };
  const signUpValidation = {
    name: {
      required: "Name is required",
    },
    email: {
      required: "Employee Code is required",
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 5,
        message: "Password must be at least 5 characters long",
      },
    },
  };
  const forgetPasswordValidation = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    },
    otp:
      otpSent && !isOtpVerified
        ? {
            required: "OTP is required",
            minLength: {
              value: 4,
              message: "OTP must be at least 4 characters",
            },
          }
        : {},
    newPassword: isOtpVerified
      ? {
          required: "New password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }
      : {},
    confirmPassword: isOtpVerified
      ? {
          required: "Confirm password is required",
          validate: (value: any) =>
            value === forgetPasswordForm.watch("newPassword") ||
            "Passwords do not match",
        }
      : {},
  };
  // const sendOtp = (userEmail: string) => {
  //   setOtpSent(true);
  //   // try {
  //   //   forgetPassword({ userEmail }).then((_response: any) => {
  //   //     setOtpSent(true);
  //   //   });
  //   // } catch (error) {
  //   //   error;
  //   // }
  // };
  // const verifyOtp = (userEmail: string, otp: string) => {
  //   setIsOtpVerified(true);
  //   // try {
  //   //   verifyOTP({ userEmail, otp }).then(() => {
  //   //     setIsOtpVerified(true);
  //   //   });
  //   // } catch (error) {
  //   //   error;
  //   // }
  // };
  // const changePassword = async (email: string, password: string) => {
  //   setIsSignInActive(true);
  //   // try {
  //   //   updatePassword({ email, password }).then((response: any) => {
  //   //     if (response.statusCode === 200) {
  //   //       setIsSignUpActive(true);
  //   //     }
  //   //   });
  //   // } catch (error) {
  //   //   error;
  //   // }
  // };
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 0,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100vh",
          backgroundColor: "#fff",
          boxShadow: 3,
          overflow: "hidden",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.6s ease-in-out",
            width: { xs: "100%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              padding: 4,
            }}
          >
            <Box
              sx={{
                maxWidth: 380,
                width: "100%",
                backgroundColor: "rgb(255, 255, 255)",
                borderRadius: "25px",
                padding: 3,
              }}
            >
              {/* <Box
                sx={{
                  width: "60px",
                  height: "60px",
                }}
              >
                <img
                  src={coherentIcon}
                  alt="Favicon"
                  style={{
                    width: "100%",
                  }}
                />
              </Box> */}
              <Typography
                align="left"
                sx={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "black",
                  mb: 2,
                }}
              >
                Sign in
              </Typography>
              <Box sx={{ mt: 2 }}>
                <form onSubmit={signInForm.handleSubmit(onSignInSubmit)}>
                  <Grid container spacing={2}>
                    <CentralizedTextInput
                      label="Email"
                      {...signInForm.register("email", signInValidation.email)}
                      error={signInForm.formState.errors.email ? true : false}
                      helperText={signInForm.formState.errors.email?.message}
                    />

                    <CentralizedTextInput
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      {...signInForm.register(
                        "password",
                        signInValidation.password
                      )}
                      error={
                        signInForm.formState.errors.password ? true : false
                      }
                      helperText={signInForm.formState.errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      fullWidth
                      disableRipple
                      variant="contained"
                      type="submit"
                      sx={{
                        textTransform: "none",
                        mt: 2,
                        borderRadius: "25px",
                        height: "45px",
                        background: "#3baa77",
                        boxShadow: "inset 2px 5px 10px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </form>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    mt: 2,
                    mb: 2,
                    color: "black",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    cursor: "pointer",
                  }}
                  onClick={handleUpForget}
                >
                  Forget Password? <ArrowUpward sx={{ fontSize: "16px" }} />
                </Typography>
                <Typography
                  align="center"
                  sx={{
                    mt: 2,
                    mb: 2,
                    color: "black",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    cursor: "pointer",
                  }}
                  onClick={handleSignIn}
                >
                  Sign up? <ArrowForward sx={{ fontSize: "16px" }} />
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* sign up form  */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              padding: 4,
            }}
          >
            <Box
              sx={{
                maxWidth: 380,
                width: "100%",
                backgroundColor: "rgb(255, 255, 255)",
                borderRadius: "25px",
                padding: 3,
              }}
            >
              {/* <Box
                sx={{
                  width: "60px",
                  height: "60px",
                }}
              >
                <img
                  src={coherentIcon}
                  alt="Favicon"
                  style={{
                    width: "100%",
                  }}
                />
              </Box> */}
              <Typography
                align="left"
                sx={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "black",
                  mb: 2,
                }}
              >
                Sign Up
              </Typography>
              <Box sx={{ mt: 2 }}>
                <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}>
                  <Grid container spacing={2}>
                    <CentralizedTextInput
                      label="Name"
                      {...signUpForm.register("name", signUpValidation.name)}
                      error={signUpForm.formState.errors.name ? true : false}
                      helperText={signUpForm.formState.errors.name?.message}
                    />

                    <CentralizedTextInput
                      label="Email"
                      {...signUpForm.register("email", signUpValidation.email)}
                      error={signUpForm.formState.errors.email ? true : false}
                      helperText={signUpForm.formState.errors.email?.message}
                    />

                    <CentralizedTextInput
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      {...signUpForm.register(
                        "password",
                        signUpValidation.password
                      )}
                      error={
                        signUpForm.formState.errors.password ? true : false
                      }
                      helperText={signUpForm.formState.errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              sx={{ padding: "0px !important" }}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Visibility
                                  sx={{ fontSize: "18px !important" }}
                                />
                              ) : (
                                <VisibilityOff
                                  sx={{ fontSize: "18px !important" }}
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      fullWidth
                      disableRipple
                      variant="contained"
                      type="submit"
                      sx={{
                        textTransform: "none",
                        mt: 2,
                        borderRadius: "25px",
                        height: "45px",
                        background: "#2456a1",
                        boxShadow: "inset 2px 5px 10px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </form>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    mt: 2,
                    mb: 2,
                    color: "black",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    cursor: "pointer",
                  }}
                  onClick={handleForget}
                >
                  <ArrowBack sx={{ fontSize: "16px" }} /> Back to Sign in?
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: isSignInActive ? "0" : "50%",
            width: { xs: "100%", sm: "50%" },
            height: "100%",
            backgroundColor: "#fff",
            backgroundImage: isSignInActive
              ? `url(${gifVideo})`
              : `url(${signupImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
            borderRadius: isSignInActive ? "25px 0 0 25px" : "0 25px 25px 0",
            zIndex: 10,
            alignItems: "center",
            justifyContent: "center",
            transition: "right 0.6s ease-in-out",
            color: "#3f51b5",
            textAlign: "center",
          }}
        />
        {/* forget password */}
        <Box
          sx={{
            position: "absolute",
            top: isSignUpActive ? 0 : "100%",
            width: { xs: "100%" },
            height: "100%",
            backgroundColor: "#fff",
            display: "flex",
            zIndex: 10,
            alignItems: "center",
            justifyContent: "center",
            transition: "top 0.6s ease-in-out",
            color: "#3f51b5",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              backgroundImage: `url(${forgetPassImg})`,
              height: "100%",
              backgroundSize: "fit",
              backgroundColor: "#8c78b2",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              padding: 4,
              borderRadius: "0px 15px 15px 0",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              padding: 4,
            }}
          >
            <Box
              sx={{
                maxWidth: 380,
                width: "100%",
                backgroundColor: "white",
                borderRadius: "25px",
                padding: 3,
              }}
            >
              {/* <Box
                sx={{
                  width: "60px",
                  height: "60px",
                }}
              >
                <img
                  src={coherentIcon}
                  alt="Favicon"
                  style={{
                    width: "100%",
                  }}
                />
              </Box> */}
              <Typography
                align="left"
                sx={{
                  fontSize: "2rem",
                  fontWeight: "900",
                  color: "black",
                }}
              >
                Forget password
              </Typography>
              <Typography
                align="left"
                sx={{ mb: 2, color: "black", fontSize: "15px" }}
              >
                Fill the form to reset your password
              </Typography>
              <Box sx={{ mt: 2 }}>
                <form
                  onSubmit={forgetPasswordForm.handleSubmit(onForgetSubmit)}
                >
                  <Grid container spacing={2}>
                    {!isOtpVerified && (
                      <>
                        <CentralizedTextInput
                          label="Email"
                          {...forgetPasswordForm.register(
                            "email",
                            forgetPasswordValidation.email
                          )}
                          error={
                            forgetPasswordForm.formState.errors.email
                              ? true
                              : false
                          }
                          helperText={
                            forgetPasswordForm.formState.errors.email?.message
                          }
                        />
                      </>
                    )}
                    {otpSent && !isOtpVerified && (
                      <>
                        <CentralizedTextInput
                          label="Otp"
                          {...forgetPasswordForm.register(
                            "otp",
                            forgetPasswordValidation.otp
                          )}
                          error={
                            forgetPasswordForm.formState.errors.otp
                              ? true
                              : false
                          }
                          helperText={
                            forgetPasswordForm.formState.errors.otp?.message
                          }
                        />
                      </>
                    )}
                    {isOtpVerified && (
                      <>
                        {" "}
                        <CentralizedTextInput
                          label="New Password"
                          type={showPassword ? "text" : "password"}
                          {...forgetPasswordForm.register(
                            "newPassword",
                            forgetPasswordValidation.newPassword
                          )}
                          error={
                            forgetPasswordForm.formState.errors.newPassword
                              ? true
                              : false
                          }
                          helperText={
                            forgetPasswordForm.formState.errors.newPassword
                              ?.message
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <CentralizedTextInput
                          label="Confirm Password"
                          type="password"
                          {...forgetPasswordForm.register(
                            "confirmPassword",
                            forgetPasswordValidation.confirmPassword
                          )}
                          error={
                            forgetPasswordForm.formState.errors.confirmPassword
                              ? true
                              : false
                          }
                          helperText={
                            forgetPasswordForm.formState.errors.confirmPassword
                              ?.message
                          }
                        />
                      </>
                    )}
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      sx={{
                        textTransform: "none",
                        borderRadius: "25px",
                        height: "45px",
                        background: "#8c78b2",
                        boxShadow: "inset 2px 5px 10px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {isOtpVerified
                        ? "Change Password"
                        : otpSent
                        ? "Verify OTP"
                        : "Send OTP"}
                    </Button>
                  </Grid>
                </form>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    mt: 2,
                    mb: 2,
                    color: "black",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    cursor: "pointer",
                  }}
                  onClick={handleSignUp}
                >
                  <ArrowDownward sx={{ fontSize: "16px" }} /> Back to SignIn
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default LoginPage;
