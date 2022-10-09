import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import UserContext from "../contexts/userContext";

import Header from "./Header";
import Companies from "./Companies";
import LogPage from "./LogPage";
import AdmPage from "./AdmPage";

function HomePage() {
  const { logAdmin, isAdm } = useContext(UserContext)

  return (
    <>
      <Header />
      <Container>

        {
          logAdmin === "true" ? (
            <LogPage />
          ) : logAdmin === ""  ? (
            <Companies />
          ) : isAdm ? (
            <AdmPage />
          ) : (
            <></>
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