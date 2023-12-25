// MUI Imports
import { Card, CardContent, Box, Typography, Link } from "@mui/material";

// Components Imports
import { Logo } from "@/components/ui";

// React Imports
// import React from "react";

export function CardTop() {
  return (
    <Card>
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Logo width={56} height={56} />
            <Box>
              <Typography variant="h5">WarpDriven AI</Typography>
              <Box display={"flex"} gap={2}>
                <Link
                  href="https://warp-driven.com/ticket"
                  underline="always"
                  sx={{ textDecorationLine: "underline" }}
                >
                  Request Demo or Recommendation System Customisation
                </Link>
                <Typography variant="caption">Or</Typography>
                <Link
                  href="https://warp-driven.com/"
                  underline="always"
                  sx={{ textDecorationLine: "underline" }}
                >
                  Check More Products
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
