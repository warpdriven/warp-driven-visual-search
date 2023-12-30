// MUI Imports
import {
  Skeleton,
  Card,
  CardHeader,
  CardContent,
  CardProps,
} from "@mui/material";
import React from "react";

export const SkeletonCard = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    // ** Props
    const { ...restProps } = props;

    return (
      <Card ref={ref} {...restProps}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton animation="wave" height={10} width="80%" sx={{ mb: 1 }} />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        ></CardHeader>
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <CardContent>
          <Skeleton animation="wave" height={10} sx={{ mb: 1 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
      </Card>
    );
  }
);
