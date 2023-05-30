import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RefObject } from "react";

const StyledMain = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "drawerToggle" && prop !== "drawerWidth",
})<{
  drawerToggle: boolean;
  drawerWidth?: number;
}>(({ theme, drawerToggle, drawerWidth }) => ({
  flexGrow: 1,
  marginLeft: drawerToggle && drawerWidth ? `${drawerWidth}px` : 0,
  transition: theme.transitions.create(["margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

interface Props {
  drawerToggle: boolean;
  drawerRef: RefObject<HTMLDivElement>;
}

function Main({ drawerToggle, drawerRef }: Props) {
  return (
    <StyledMain
      drawerToggle={drawerToggle}
      drawerWidth={drawerToggle ? drawerRef.current?.offsetWidth : 0}
    >
      <Typography>App</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
        cupiditate eveniet, ipsa iure quisquam quos reprehenderit? A ab
        architecto assumenda cumque dolore dolorum ducimus earum, excepturi
        facere incidunt ipsam itaque nobis odio odit officia quia sapiente
        totam. Ad, culpa dicta dolor eligendi facilis molestiae obcaecati, odit
        quis reprehenderit sed tempora velit voluptatem! Alias at aut dicta hic
        illo, minima officiis repudiandae saepe sapiente sed temporibus ullam
        unde, voluptatum. Ab explicabo nam veniam? Adipisci blanditiis cumque
        dolores earum incidunt maxime placeat porro quaerat quia quos, unde
        vero? Asperiores atque facilis in? Asperiores culpa excepturi fuga iusto
        neque placeat quisquam! Accusamus adipisci aspernatur aut autem delectus
        eius, enim facere iusto laborum nisi nulla quae quisquam quos sequi sunt
        tempore, vel voluptates? Autem culpa doloribus, facilis fugit iusto,
        nesciunt obcaecati odio optio placeat praesentium quasi tenetur.
        Accusantium aperiam ducimus harum impedit rem! A amet animi aperiam,
        architecto, at atque beatae consectetur distinctio doloribus ducimus
        enim error, et ex facere facilis iste iure magni molestias obcaecati
        officia perspiciatis qui quo rem repellat repellendus sapiente sed
        similique soluta tempora voluptatem. Labore, porro veritatis. Architecto
        aspernatur deleniti dicta, enim excepturi inventore magni nemo non
        placeat quae, quaerat, reprehenderit saepe totam unde veniam vitae
        voluptates? Accusantium ad adipisci, debitis dolore doloribus enim esse
        ex facere illum nesciunt non ratione repellendus suscipit tenetur!
      </Typography>
    </StyledMain>
  );
}

export default Main;
