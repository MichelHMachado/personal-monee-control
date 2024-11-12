"use client";
import React from "react";
import { Typography, Box, AppBar, Toolbar, useTheme } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import LogoutButton from "../Auth/LogoutButton";
import Link from "next/link";

const TopBar = () => {
  const theme = useTheme();
  const { userData } = useAuth();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.primary.main,
        padding: "10px 0",
        borderBottomRightRadius: "18px",
        borderBottomLeftRadius: "18px",
        marginBottom: "40px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link
            href="/"
            className="flex items-center rounded-2xl overflow-hidden"
          >
            <Image
              style={{
                width: "auto",
                height: "auto",
                maxHeight: "80px",
                maxWidth: "80px",
              }}
              alt="Logo"
              width={80}
              height={80}
              src="/logo.png"
              priority
            />
          </Link>
          <Typography variant="h6" sx={{ marginRight: 2 }}>
            Hello, {userData?.name ? userData.name : "Guest"}!
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
