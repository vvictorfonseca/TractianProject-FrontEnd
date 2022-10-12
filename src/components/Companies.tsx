import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../contexts/userContext";
import CompanyBox from "./CompanyBox";

function Companies() {
  type company = {
    name: String;
    isAdm: Boolean;
    id: String;
  }

  const { companies, setCompanies } = useContext(UserContext)

  useEffect(() => {
    getCompanies()
  }, [])

  function getCompanies() {
    const URL = "https://tractian-project-vh.herokuapp.com/get/companies"

    const promise = axios.get(URL)
    promise.then(response => {
      const { data } = response
      setCompanies(data)
    })
    promise.catch(err => {
      console.log(err)
    })
  }

  return (
    <Body>
      <H1Box>
        <H1>Select your Company to Log</H1>
      </H1Box>

      <CompaniesBoxes>
        {companies.map((info: company, index: number) => {
          return (<CompanyBox key={index} {...info} />)
        })}
      </CompaniesBoxes>
    </Body>
  )
}

const Body = styled.div`
  width: 50vw;
  //height: 100vh;
  //background-color: purple;
`

const H1Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 10vh;
  margin-top: 15px;
  background-color: #0258e8;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`
const H1 = styled.div`
  font-size: 25px;
  color: white;
`
const CompaniesBoxes = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 50vw;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #f5f5f5;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

export default Companies