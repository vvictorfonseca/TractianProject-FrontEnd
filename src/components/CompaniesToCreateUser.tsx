import { useContext } from "react";
import styled from "styled-components";

import UserContext from "../contexts/userContext";

import CompanyBoxAdm from "./CompanyBoxAdm";

function CompaniesToCreateUser() {
  type company = {
    id: String
    name: String;
    isAdm: Boolean;
  }
  
  const { companies } = useContext(UserContext)

  return (
    <Body>
      <H1Box>
        <H1>Which company the new user is working?</H1>
      </H1Box>

      <CompaniesBoxes>
        {companies.map((info: company, index: number) => {
          return (<CompanyBoxAdm key={index} {...info} />)
        })}
      </CompaniesBoxes>
    </Body>
  )
}

const Body = styled.div`
  width: 50vw;
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50vw;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #f5f5f5;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

export default CompaniesToCreateUser;