import { useContext } from "react";
import styled from "styled-components"

import UserContext from "../contexts/userContext";
import CompanyContext from "../contexts/CompanyContext";

interface Props {
  name: String;
  isAdm: Boolean;
  key: Number;
  id: String;
}

function CompanyBox( props: Props ) {
  console.log(props)
  const { setLogAdmin, setCompanyInfo } = useContext(UserContext)
  const { companyCounts, setCompanyCounts, pageControl, setPageControl, setCompany } = useContext(CompanyContext)
  
  return (
    <Box onClick={() => {
      setLogAdmin("false")
      setCompany({
        companyId: props.id,
        name: props.name
      })
    }}>
      <H2>{props.name}</H2>
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  cursor: pointer;
`
const H2 = styled.h2`
  text-align: center;
  font-size: 18px;
`
export default CompanyBox;