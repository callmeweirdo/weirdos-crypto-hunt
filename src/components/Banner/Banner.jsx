import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";

// ! component import
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(/banner2.jpg)",
    // backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tageline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
  }
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginTop: 15,
              fontFamily: "montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography 
            variant="subtitle2"
            style={{ 
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "montserrat"
             }}
          >
              Get all the info regarding your favourite Crypto currunecies
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
