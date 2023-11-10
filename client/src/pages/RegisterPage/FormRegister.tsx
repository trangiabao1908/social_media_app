import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { IThemeOptions } from "../../utils/theme";
import { Formik, FormikState } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Dropzone from "react-dropzone";
import DisplayFLexBetween from "../../components/DisplayFlexBetween/DisplayFLexBetween";
import { AuthContext, AuthContextType } from "../../contexts/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { registerUserFn } from "../../api/authApi";
import { AxiosError } from "axios";

export interface RegisterFormType {
  username: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: File | null;
}

export interface onSubmitRegisterProps {
  resetForm: (nextState?: Partial<FormikState<RegisterFormType>>) => void;
}
// define registerSchema
const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
  location: yup.string(),
  occupation: yup.string(),
  picture: yup.string().required("Picture is required"),
});
// create initialValues Register
const initialValuesRegister: RegisterFormType = {
  username: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: null,
};
const FormRegister = () => {
  const { openAlert, setOpenAlert, setInfoAlert } =
    useContext<AuthContextType>(AuthContext);
  const navigate = useNavigate();
  const theme: IThemeOptions = useTheme();
  const backGroundButton = theme.palette.primary.main;
  const colorTextButton = theme.palette.background.alt;
  const textLight = theme.palette.primary.light;
  const isNonResponsive = useMediaQuery("(min-width: 1000px)");

  const { mutate: registerUser } = useMutation({
    mutationFn: (values: RegisterFormType) => registerUserFn(values),
    onSuccess: (res) => {
      if (res.success) {
        setOpenAlert(!openAlert);
        setInfoAlert({
          type: "success",
          message: res.message,
          time: 3000,
        });
        navigate("/login");
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        setOpenAlert(!openAlert);
        setInfoAlert({
          type: "error",
          message: err.response?.data.message,
          time: 3000,
        });
        return err.response?.data;
      } else if (err instanceof Error) {
        console.log(err.message);
        return { success: false, message: err.message };
      }
    },
  });

  const handleFormSubmit = async (
    values: RegisterFormType,
    onSubmitProps: onSubmitRegisterProps
  ) => {
    registerUser(values);
    onSubmitProps.resetForm();
  };
  return (
    <React.Fragment>
      <Formik
        onSubmit={handleFormSubmit}
        validationSchema={registerSchema}
        initialValues={initialValuesRegister}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display={"grid"}
              gap={"22px"}
              gridTemplateColumns={"repeat(4, minmax(0,1fr))"}
              sx={{
                "& > div": {
                  gridColumn: isNonResponsive ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Location"
                type="location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={Boolean(touched.location) && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Occupation"
                type="occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                }
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4" }}
              />
              <Box
                gridColumn={"span 4"}
                sx={{
                  border: `1px solid ${theme.palette.neutral.medium}`,
                  borderRadius: "5px",
                  padding: "16px",
                }}
              >
                <Dropzone
                  accept={{ "image/*": [".jpeg", ".png", ".jpg"] }}
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    setFieldValue("picture", acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <>
                      <Box
                        {...getRootProps()}
                        padding={"12px"}
                        border={`2px dashed ${theme.palette.neutral.mediumMain} `}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture?.name ? (
                          <p>
                            Drag picture here to set Avatar, or click to select
                            file
                          </p>
                        ) : (
                          <DisplayFLexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditIcon />
                          </DisplayFLexBetween>
                        )}
                      </Box>
                    </>
                  )}
                </Dropzone>
              </Box>
            </Box>
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  margin: "30px 0",
                  padding: "14px",
                  bgcolor: backGroundButton,
                  color: colorTextButton,
                  "&:hover": { color: backGroundButton },
                }}
              >
                REGISTER
              </Button>
              <Typography
                sx={{
                  textDecoration: "underline",
                  color: backGroundButton,
                  "&:hover": { cursor: "pointer", color: textLight },
                }}
                onClick={() => {
                  navigate("/login");
                  resetForm();
                }}
              >
                You have an account? Click here to login
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default FormRegister;
