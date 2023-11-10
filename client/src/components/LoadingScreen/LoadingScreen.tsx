import { Box, CircularProgress, Theme } from "@mui/material";
type Props = {
  theme: Theme;
};
const LoadingScreen: React.FC<Props> = (props) => {
  const { theme } = props;
  return (
    <>
      <Box sx={{ height: "100vh", bgcolor: theme.palette.background.default }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <CircularProgress color="primary" />
        </Box>
      </Box>
    </>
  );
};

export default LoadingScreen;
