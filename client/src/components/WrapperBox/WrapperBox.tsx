import { styled } from "@mui/system";
import { Box } from "@mui/material";
const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  padding: "24px 24px 10px 24px",
  borderRadius: "10px",
}));
export default WrapperBox;
