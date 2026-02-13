import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          Flugo - Employee Register
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
