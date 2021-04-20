import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Box } from '@chakra-ui/react'
import Navbar from "../Common/Navbar";
import MainSection from "./MainSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <Box>
        <Switch>
          <Route exact path="/home" component={MainSection} />
          {/* <Route exact path="/my/password/edit" component={PasswordEdit} /> */}
          {/* <Route exact path="/my/profile" component={Profile} /> */}
          <Redirect from="/" to="/home" />
        </Switch>
      </Box>
    </>
  );
};

export default Home;
