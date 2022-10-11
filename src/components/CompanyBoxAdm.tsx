import { useContext } from "react";
import axios from "axios";
import styled from "styled-components"

import UserContext from "../contexts/userContext";

interface Props {
  id: String
  name: String;
  isAdm: Boolean;
  key: Number
}

function CompanyBoxAdm( props: Props ) {
  const { companyInfo, setCompanyInfo, userToken } = useContext(UserContext)
  console.log(companyInfo)

  return (
    <Box onClick={() => setCompanyInfo(props)} >
      <H2>{props.name}</H2>
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 280px;
  height: 40px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: #0258e8;
  cursor: pointer;
`
const H2 = styled.h2`
  text-align: center;
  font-size: 18px;
  color: white;
`

export default CompanyBoxAdm;