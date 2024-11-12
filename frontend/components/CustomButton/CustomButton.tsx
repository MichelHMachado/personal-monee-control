import React from "react";
import { Button, SxProps, Theme, useTheme } from "@mui/material";

interface Props {
  children: React.ReactNode;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: () => void;
  isDanger?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const CustomButton = ({
  children,
  type = "button",
  onClick,
  isDanger,
  disabled,
  sx,
}: Props) => {
  const theme = useTheme();
  return (
    <Button
      type={type}
      onClick={onClick}
      sx={{
        bgcolor: isDanger
          ? theme.palette.danger.main
          : theme.palette.primary.main,
        padding: "8px 60px",
        borderRadius: "10px",
        color: "#FFF",
        "&:hover": {
          bgcolor: isDanger
            ? theme.palette.danger.light
            : theme.palette.primary.light,
          boxShadow: theme.shadows[1],
        },
        ...sx,
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
