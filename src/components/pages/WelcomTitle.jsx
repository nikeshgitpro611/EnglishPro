import { Typography, Box } from "@mui/material";

const WelcomeTitle = ({ username, isMobile }) => {
  return (
    <Typography
      variant={isMobile ? "h5" : "h4"}
      sx={{
        fontWeight: 600,
        mb: 3,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {/* Hello */}
      <Box
        component="span"
        sx={{
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Hello
      </Box>

      {/* Username */}
      <Box
        component="span"
        sx={{
          color: "#2e7d32", // green highlight
          fontWeight: 700,
        }}
      >
        {username}!
      </Box>

      {/* Welcome text */}
      <Box
        component="span"
        sx={{
          background: "linear-gradient(90deg, #26c6da, #00acc1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Welcome to Learn English
      </Box>

      {/* Book emoji */}
      <Box
        component="span"
        sx={{
          color: "#ff9800", // book color
          fontSize: "1.1em",
        }}
      >
        📚
      </Box>
    </Typography>
  );
};

export default WelcomeTitle;
