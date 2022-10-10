import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import UserContext from "../contexts/userContext";

import Header from "./Header";
import Companies from "./Companies";
import LogPage from "./LogPage";
import AdmPage from "./AdmPage";
import UserPage from "./UserPage";

function HomePage() {
  const { logAdmin, isAdm } = useContext(UserContext)

  return (
    <>
      <Header />
      <Container>

        {
          logAdmin === "" ? (
            <Companies />
          ) : logAdmin === "true" ? (
            <LogPage />
          ) : logAdmin === "false" ? (
            <LogPage />
          ) : isAdm ? (
            <AdmPage />
          ) : (
            <UserPage />
          )
        }

      </Container>
    </>
  )
}

const Container = styled.main`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
export default HomePage