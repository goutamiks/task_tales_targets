import React, { useState, useContext } from "react";
import {
  Box,
  Avatar,
  IconButton,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { ColorModeContext, tokens } from "../themes";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const { toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    // Implement logout functionality here, such as clearing session or removing tokens
    localStorage.removeItem("userId");
    // Redirect to the login page after logout
    navigate("/login");

    // Close the logout confirmation dialog
    setOpenLogoutDialog(false);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      position="fixed"
      width="100%"
      top={0}
      zIndex={1000}
    >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton onClick={handleLogoutClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* LOGOUT CONFIRMATION DIALOG */}

      <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
        <Paper>
          <DialogTitle style={{ fontWeight: 900 }}>
            Logout Confirmation
          </DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to logout?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
            <Button onClick={handleConfirmLogout} color="error">
              Logout
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </Box>
  );
};

export default Topbar;
