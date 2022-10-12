import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../contexts/userContext";
import CompanyContext from "../contexts/CompanyContext";

import Header from "./Header";
import Companies from "./Companies";
import LogPage from "./LogPage";
import AdmPage from "./AdmPage";
import UserPage from "./UserPage";

function HomePage() {
  const { logAdmin, setLogAdmin, isAdm, setIsAdm, userName } = useContext(UserContext)
  const { setCompany } = useContext(CompanyContext)

  useEffect(() => {
    checkLoginStatus()
  }, [])

  function checkLoginStatus() {
    const URL = `https://tractian-project-vh.herokuapp.com/user/${userName}`

    const promise = axios.get(URL)
    promise.then(response => {
      const { data } = response
      setLogAdmin(null)
      setCompany({
        companyId: data.companyId,
        name: data.name
      })
      
      data.status === true ? setIsAdm(true) : setIsAdm(false)
    })
  }

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