import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  Search as SearchIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import WelcomeTitle from "./pages/WelcomTitle";
import Header from "./Header";

const AllAttributsField = () => {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  

  // Sample application data
  const applications = [
    {
      id: 1,
      title: "Vocabulary",
      subtitle: "Collection of Vocabulary",
      featured: true,
    },
  ];

  const user = useSelector((state) => state.auth.user);
  const username = (user && (user.name || user.email)) || "John";


  return (
    <Box
      sx={{
        flex: 1,
        p: isMobile ? 2 : 4,
        backgroundColor: "#fafafa",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Welcome Header */}
      <WelcomeTitle username={username} isMobile={isMobile} />

      {/* Applications Grid Container (non-scrollable) */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Grid container spacing={3}>
          {applications.map((app) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={app.id}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: app.featured
                    ? "2px solid #D32F2F"
                    : "1px solid #e0e0e0",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    borderColor: "#D32F2F",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    height: "100%",
                    minHeight: 120,
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: app.featured ? "#D32F2F" : "#333",
                        fontSize: isMobile ? "1rem" : "1.1rem",
                      }}
                    >
                      {app.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {app.subtitle}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SettingsIcon sx={{ color: "#999", fontSize: 28 }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AllAttributsField;
