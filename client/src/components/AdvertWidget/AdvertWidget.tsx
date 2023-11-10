import React from "react";
import { Typography, useTheme } from "@mui/material";
import { IThemeOptions } from "../../utils/theme";
import DisplayFLexBetween from "../DisplayFlexBetween/DisplayFLexBetween";
import WrapperBox from "../WrapperBox/WrapperBox";
const AdvertWidget: React.FC = () => {
  const theme: IThemeOptions = useTheme();
  return (
    <WrapperBox>
      <DisplayFLexBetween>
        <Typography
          variant="h5"
          fontSize={"16px"}
          color={theme.palette.neutral.dark}
          fontWeight={"600"}
        >
          Sponsored
        </Typography>
        <Typography
          color={theme.palette.neutral.main}
          fontSize={"14px"}
          sx={{ cursor: "pointer" }}
        >
          Create Advert
        </Typography>
      </DisplayFLexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://pic5.iqiyipic.com/image/20211120/6d/6f/p_5273988_m_601_m4_1080_608.jpg"
        style={{ borderRadius: "8px", margin: "10px 0" }}
      />
      <DisplayFLexBetween>
        <Typography color={theme.palette.neutral.main} fontSize={"14px"}>
          MetaSocial
        </Typography>
        <Typography color={theme.palette.neutral.medium} fontSize={"14px"}>
          metasocial.com
        </Typography>
      </DisplayFLexBetween>
      <Typography
        color={theme.palette.neutral.main}
        margin="8px 0"
        fontSize={"14px"}
      >
        This is description of Advert.
      </Typography>
    </WrapperBox>
  );
};

export default AdvertWidget;
