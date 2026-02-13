import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Logo Empresa
        </Typography>

        <List>
          <ListItemButton
            component={NavLink}
            to="/collaborators"
            sx={{
              "&.active": {
                backgroundColor: "rgba(0,0,0,0.08)",
              },
            }}
          >
            <ListItemText primary="Colaboradores" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
