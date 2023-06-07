import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
} from "@mui/material";

function CardSkeleton() {
  // return (
  //   <Stack>
  //     {/*<Skeleton variant="rectangular" sx={{ borderRadius: "4px" }} />*/}
  //     <Box
  //       sx={{
  //         padding: 2, // 16px
  //         display: "flex",
  //         justifyContent: "space-between",
  //       }}
  //     >
  //       <Skeleton
  //         variant="circular"
  //         sx={{
  //           mr: 2,
  //           minWidth: "40px",
  //           minHeight: "40px",
  //         }}
  //       />
  //       <Box sx={{ width: "100%" }}>
  //         <Skeleton variant="text" sx={{ fontSize: "14px" }} />
  //         <Skeleton variant="text" sx={{ fontSize: "12.5px" }} />
  //       </Box>
  //     </Box>
  //     <Box
  //       sx={{
  //         padding: 2, // 16px
  //       }}
  //     >
  //       <Skeleton variant="text" sx={{ fontSize: "14px", width: "100%" }} />
  //     </Box>
  //     <Stack direction="row" sx={{ padding: 1 }}>
  //       <Box
  //         sx={{
  //           padding: 1, // 16px
  //         }}
  //       >
  //         <Skeleton
  //           variant="rectangular"
  //           sx={{
  //             width: "24px",
  //             height: "24px",
  //           }}
  //         />
  //       </Box>
  //       <Box
  //         sx={{
  //           padding: 1, // 16px
  //         }}
  //       >
  //         <Skeleton
  //           variant="rectangular"
  //           sx={{
  //             width: "24px",
  //             height: "24px",
  //           }}
  //         />
  //       </Box>
  //     </Stack>
  //   </Stack>
  // );

  return (
    <Card>
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
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "14px" }} />
        }
        subheader={
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "12.5px" }}
          />
        }
      />
      <CardContent>
        <Skeleton animation="wave" variant="text" sx={{ fontSize: "14px" }} />
      </CardContent>
      <CardActions>
        <IconButton>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={24}
            height={24}
          />
        </IconButton>
        <IconButton>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={24}
            height={24}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default CardSkeleton;
