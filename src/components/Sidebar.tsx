import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          borderRight: "1px dashed #e5e7eb",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Box sx={{ mb: 2 }}>
            <img src={logo} alt="Logo" style={{ height: 28 }} />
          </Box>

          <List>
            <ListItemButton
              component={NavLink}
              to="/collaborators"
              sx={{
                borderRadius: 2,
                px: 1,
                py: 1,
                display: "flex",
                justifyContent: "space-between",
                color: "#111827",

                "& .MuiListItemIcon-root": {
                  color: "#111827",
                },

                "& .MuiTypography-root": {
                  color: "#9ca3af",
                  fontWeight: 500,
                },

                "& svg": {
                  color: "#9ca3af",
                },

                "&.active": {
                  backgroundColor: "#00E676",

                  "& .MuiListItemIcon-root": {
                    color: "#ffffff",
                  },

                  "& .MuiTypography-root": {
                    color: "#ffffff",
                    fontWeight: 600,
                  },

                  "& svg": {
                    color: "#ffffff",
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <PersonOutlineIcon fontSize="small" />
                </ListItemIcon>

                <ListItemText primary="Colaboradores" />
              </Box>

              <ChevronRightIcon sx={{ fontSize: 22 }} />
            </ListItemButton>
          </List>
        </Box>
      </Box>

      {/* LOGOUT */}
      <Box sx={{ px: 3, pb: 3 }}>
        <List>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              px: 1,
              py: 1,
              color: "#ef4444",

              "& .MuiListItemIcon-root": {
                color: "#ef4444",
              },

              "&:hover": {
                backgroundColor: "rgba(239, 68, 68, 0.08)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText primary="Sair" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
