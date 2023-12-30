// React Imports
import React from "react";
import ReactDOM from "react-dom";

// MUI Imports
import {
  IconButton,
  Drawer,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  CardMedia,
  CardActionArea,
  Skeleton,
  Container,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { FilterCenterFocusOutlined, CloseOutlined } from "@mui/icons-material";

// Components Imports
import { Scrollbar } from "@/components/ui";

// Hooks Imports
import { useObserverIntersection } from "@/hooks";

const wooSelector =
  "#product-list-container > .product-item-list > .shopline-element-product-item";
const warpSelector =
  "#ProductListContainer .product-list-content > li > .product-card-wrapper";
void wooSelector;

export function List() {
  const [elList, setElList] = React.useState<Element[]>([]);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [count, setCount] = React.useState(12);

  const handleCloseDrawer = React.useCallback(() => {
    setShowDrawer(false);
  }, [setShowDrawer]);

  const handleOpenDrawer = React.useCallback(() => {
    setShowDrawer(true);
  }, [setShowDrawer]);

  const listNode = React.useMemo(() => {
    return elList.map((item, idx) => {
      return ReactDOM.createPortal(
        <IconButton
          key={idx}
          onClick={handleOpenDrawer}
          size="small"
          sx={{
            position: "absolute",
            zIndex(theme) {
              return theme.zIndex.fab;
            },
            top: 0,
            left: 0,
          }}
        >
          <FilterCenterFocusOutlined fontSize="small" />
        </IconButton>,
        item
      );
    });
  }, [elList, handleOpenDrawer]);

  const productsNode = React.useMemo(() => {
    const list = [];

    for (let i = 0; i < count; i++) {
      list.push(<ProductCard key={i} idx={i} />);
    }
    return list;
  }, [count]);

  React.useEffect(() => {
    const getProducts = () => {
      const selector = warpSelector;
      setElList([...document.querySelectorAll(selector)]);
    };
    getProducts();

    const observer = new MutationObserver(getProducts);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      const restList = observer.takeRecords();
      restList.forEach(getProducts);
      observer.disconnect();
    };
  }, [setElList]);

  return (
    <>
      {listNode}
      <Drawer
        open={showDrawer}
        onClose={handleCloseDrawer}
        anchor="bottom"
        sx={{
          "& > .MuiPaper-root": {
            borderRadius: "0.5rem 0.5rem 0 0",
          },
        }}
      >
        <Box display={"flex"} flexDirection={"column"} height={"65vh"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={(theme) => theme.spacing(3.5, 5)}
          >
            <Box>
              <Typography variant="h6" fontWeight={500}>
                WarpDriven
              </Typography>
              <Typography
                variant="caption"
                color={"secondary"}
                textTransform={"uppercase"}
              >
                Visual Similar
              </Typography>
            </Box>
            <IconButton onClick={handleCloseDrawer}>
              <CloseOutlined />
            </IconButton>
          </Box>
          <Divider></Divider>
          <Box flex={1} overflow={"hidden"}>
            <Scrollbar>
              <Container maxWidth="xl">
                <Grid container spacing={{ xs: 2, md: 6 }} p={{ xs: 2, md: 3 }}>
                  {productsNode}
                  <Grid item xs={12}>
                    <Loader onIntersection={() => setCount((p) => p + 4)} />
                  </Grid>
                </Grid>
              </Container>
            </Scrollbar>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

function ProductCard(props: ProductCardProps) {
  const { idx } = props;

  const descOdd = "Asymmetric Draped Jumper";
  const descEven =
    "Merry Christmas Family Matching Pajamas Set Grey Christmas Pajamas";
  const imgOdd =
    "https://img.myshopline.com/image/store/1693646354478/fce735352688321172d5da2d7d0e8fbd_540x.jpg?w=800&h=800";
  const imgEven =
    "https://img.myshopline.com/image/store/1693646354478/75ab296089d576a0d536b7a00e7a3437_540x.jpg?w=1000&h=1000";

  const isSmall = useMediaQuery<Theme>((theme) => {
    return theme.breakpoints.down("md");
  });

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{ height: "100%" }}>
        <CardActionArea
          href="https://www.google.com"
          target="_blank"
          sx={{
            "&:hover [data-warpdriven-title]": {
              textDecorationLine: "underline",
            },
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            image={idx % 2 === 0 ? imgEven : imgOdd}
            height={isSmall ? 256 : 384}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              data-warpdriven-title
            >
              {idx % 2 === 0 ? descEven : descOdd}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              $9.99
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

interface ProductCardProps {
  idx: number;
}

function Loader(props: LoaderProps) {
  // Props
  const { onIntersection } = props;

  const loaderRef = React.useRef<HTMLSpanElement>(null);
  const entry = useObserverIntersection(loaderRef);
  React.useEffect(() => {
    if (!entry) return;
    if (!entry.isIntersecting) return;

    const timer = setTimeout(onIntersection, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [entry, onIntersection]);

  return (
    <>
      <Skeleton ref={loaderRef} />
      <Skeleton />
      <Skeleton />
    </>
  );
}

interface LoaderProps {
  onIntersection(): void;
}
