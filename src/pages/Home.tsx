import { Box } from "@mui/material";
import welcome from "../assets/welcome.png";

export default function Home() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#6b7280",
      }}
    >
      <img src={welcome} alt="Welcome" style={{ maxWidth: "40%" }} />
    </Box>
  );
}
