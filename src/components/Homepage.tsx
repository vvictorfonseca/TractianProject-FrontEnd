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
  const { company, setCompany } = useContext(CompanyContext)
  console.log(userName)

  useEffect(() => {
    checkLoginStatus()
  }, [])

  function checkLoginStatus() {
    console.log("entrou na função")
    const URL = `http://localhost:5000/user/${userName}`

    const promise = axios.get(URL)
    promise.then(response => {
      console.log("entrou")
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