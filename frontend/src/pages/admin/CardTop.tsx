import { Card, CardContent, Box, Typography, Link } from "@mui/material";
import { Logo } from "@/components/ui";

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
              <Box>
                <Link
                  href="https://warp-driven.com/ticket"
                  target="_blank"
                  variant="body2"
                  underline="always"
                  sx={{ textDecorationLine: "underline" }}
                >
                  Request Demo or Recommendation System Customisation
                </Link>{" "}
                <Typography variant="body2" component={"span"}>
                  Or
                </Typography>{" "}
                <Link
                  href="https://warp-driven.com/"
                  target="_blank"
                  variant="body2"
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
