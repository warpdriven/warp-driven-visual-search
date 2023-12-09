// MUI Imports
import {
  Card,
  CardProps,
  CardHeader,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";

export function SkeletonCard(props: CardProps) {
  return (
    <Card {...props}>
      <CardHeader title="Loading..." />
      <CardContent>
        <Typography component="div" variant="h3">
          <Skeleton />
        </Typography>
        <Typography>
          <Skeleton animation="wave" />
        </Typography>
        <Typography variant="body2">
          <Skeleton animation={false} width={"60%"} />
        </Typography>
      </CardContent>
    </Card>
  );
}
