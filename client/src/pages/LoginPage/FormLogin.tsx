import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import {
  useTheme,
  useMediaQuery,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { IThemeOptions } from "../../utils/theme";
import { useNavigate } from "react-router-dom";
import { FormikState } from "formik";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthProvider";
import authToken from "../../utils/authToken";
import { useMutation } from "@tanstack/react-query";
import { loginUserFn } from "../../api/authApi";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux";
import { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";
export interface LoginFormValues {
  email: string;
  password: string;
}
export interface onSubmitProps {
  resetForm: (nextState?: Partial<FormikState<LoginFormValues>>) => void;
}
// define the loginSchema //
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesLogin: LoginFormValues = {
  email: "",
  password: "",
};

const FormLogin = () => {
  const theme: IThemeOptions = useTheme();
  const navigate = useNavigate();
  const isNonResponsive = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  const backGroundButton = theme.palette.primary.main;
  const colorTextButton = theme.palette.background.alt;
  const textLight = theme.palette.primary.light;
  const { openAlert, setOpenAlert, setInfoAlert } =
    useContext<AuthContextType>(AuthContext);
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (values: LoginFormValues) => loginUserFn(values),
    onSuccess: (res) => {
      if (res.success) {
        setInfoAlert({
          type: "success",
          message: res.message,
          time: 3000,
        });
        setOpenAlert(!openAlert);
        dispatch(setLogin(res));
        authToken.setToken(res.accessToken as string);
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        setInfoAlert({
          type: "error",
          message: err.response?.data.message,
          time: 3000,
        });
        setOpenAlert(!openAlert);
        return err.response?.data;
      } else if (err instanceof Error) {
        return { success: false, message: err.message };
      }
    },
  });
  const handleFormSubmit = async (
    values: LoginFormValues,
    onSubmitProps: onSubmitProps
  ) => {
    loginUser(values);
    onSubmitProps.resetForm();
  };
  return (
    <React.Fragment>
      <Formik
        onSubmit={handleFormSubmit}
        validationSchema={loginSchema}
        initialValues={initialValuesLogin}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          //   setFieldValue,
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
                variant="outlined"
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
            </Box>
            <Box>
              <LoadingButton
                fullWidth
                loading={isPending}
                disableElevation
                type="submit"
                sx={{
                  margin: "30px 0",
                  padding: "14px",
                  bgcolor: backGroundButton,
                  color: colorTextButton,
                  "&:hover": { color: backGroundButton },
                }}
              >
                LOGIN
              </LoadingButton>
              <Typography
                sx={{
                  textDecoration: "underline",
                  color: backGroundButton,
                  "&:hover": { cursor: "pointer", color: textLight },
                }}
                onClick={() => {
                  navigate("/register");
                  resetForm();
                }}
              >
                You dont' have an account? Click here to register
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default FormLogin;
