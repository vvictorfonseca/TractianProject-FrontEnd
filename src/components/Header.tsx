import styled from "styled-components"
import { useContext } from "react";

import UserContext from "../contexts/userContext";
import CompanyContext from "../contexts/CompanyContext";

import { Button } from "antd";
import { UserOutlined } from '@ant-design/icons';

function Header() {
  const { setLogAdmin, isAdm, logAdmin, setCompanyInfo, setUserName, setUserToken } = useContext(UserContext)
  const { setPageControl, setUnitName } = useContext(CompanyContext)

  function logOut() {
    if (window.confirm("Você deseja se deslogar?")) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('city');
      window.localStorage.removeItem('fullName');
      window.localStorage.removeItem('photo');
      window.localStorage.removeItem('userName');
      window.localStorage.removeItem('professionalDescription');
      
      setLogAdmin("")
      setPageControl("")
      setCompanyInfo(null)
      setUserName(null)
      setUserToken(null)
      setUnitName("")
    }
  }

  return (
    <Box>

      {
        logAdmin === "" || logAdmin === "true" ? (
          <>
            <BoxCompany onClick={() => setLogAdmin("")}>
              <H1>TRACTIAN</H1>
            </BoxCompany>
            <ButtonBox onClick={() => setLogAdmin("true")}>
              <Button type="primary" shape="round" icon={<UserOutlined />} size="large" style={{ backgroundColor: "#0258e8", border: 'none' }} />
              <Span>Log as Admin</Span>
            </ButtonBox>
          </>
        ) : logAdmin === "false" ? (
          <>
            <BoxCompany onClick={() => setLogAdmin("")}>
              <H1>TRACTIAN</H1>
            </BoxCompany>
            <ButtonBox onClick={() => setLogAdmin("true")}>
              <Button disabled={true} type="primary" shape="round" icon={<UserOutlined />} size="large" style={{ backgroundColor: "#0258e8", border: 'none' }} />
            </ButtonBox>
          </>
        ) : isAdm || !isAdm ? (
          <>
            <BoxCompany>
              <H1>TRACTIAN</H1>
            </BoxCompany>
            <ButtonBox onClick={() => logOut()}>
              <Button type="primary" shape="round" icon={<UserOutlined />} size="large" style={{ backgroundColor: "#0258e8", border: 'none' }} />
              <Span>Log of</Span>
            </ButtonBox>
          </>
        ) : (
          <>
            <BoxCompany onClick={() => setLogAdmin("")}>
              <H1>TRACTIAN</H1>
            </BoxCompany>
            <ButtonBox onClick={() => setLogAdmin("true")}>
              <Button type="primary" shape="round" icon={<UserOutlined />} size="large" style={{ backgroundColor: "#0258e8", border: 'none' }} />
              <Span>Log as Admin</Span>
            </ButtonBox>
          </>
        )
      }
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  align-items: center;
  background-color: #fdf9f9;
  height: 12vh;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  position: relative;
`
const BoxCompany = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #0258e8;
  border-radius: 8px;
  margin-left: 50px;
  width: 145px;
  height: 50px;
  cursor: pointer;
`

const H1 = styled.h1`
  font-size: 25px;
  font-weight: 500;
  color: white;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 180px;
  position: absolute;
  right: 0;
`

const Span = styled.span`
  font-size: 13px;
  margin-top: 5px;
`

export default Header