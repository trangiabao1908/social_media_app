import { AlertColor } from "@mui/material";

export interface IInfoAlert {
  time: number;
  type: AlertColor | undefined;
  message: string;
}
