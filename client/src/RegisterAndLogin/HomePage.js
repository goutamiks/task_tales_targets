import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Calendar from "../HomePage/Calendar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import Dashboard from "../HomePage/Dashboard";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
} from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function HomePage({ loginDetails }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  useEffect(() => {
    localStorage.setItem("userId", loginDetails.userId);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleOpenUserMenu = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleConfirmLogout = () => {
    // Implement logout functionality here, such as clearing session or removing tokens
    localStorage.removeItem("userId");
    // Redirect to the login page after logout
    navigate("/login");

    // Close the logout confirmation dialog
    setOpenLogoutDialog(false);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TASK TARGET TALES
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Box>
              <Tooltip title="Log Out">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{loginDetails.name[0] || "U"}</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ width: "100%", bgcolor: "#FFF" }}>
        <AppBar position="static" sx={{ bgcolor: "#FFF" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
            sx={{
              "& .MuiTabs-root": {
                color: "#FFF", // Font color
              },
              "& .MuiTab-root": {
                fontWeight: 700, // Bold font
              },
            }}
          >
            <Tab label="TASK & TARGET" {...a11yProps(0)} />
            <Tab label="TALES" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Calendar />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Dashboard />
          </TabPanel>
        </SwipeableViews>

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
    </>
  );
}
