// MUI Imports
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

// React Imports
// import React from "react";

// Store Imports
import { useSearchParams } from "@/hooks/store";

export function ConnectForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  void searchParams;

  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardContent></CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setSearchParams((prev) => {
                prev.delete("access_token");

                return prev;
              });
            }}
          >
            reset
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
