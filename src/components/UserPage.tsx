import { useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import UserContext from "../contexts/userContext"
import CompanyContext from "../contexts/CompanyContext";

import UnitsPage from "./UnitsPage";
import AssetPage from "./AssetPage";

import { UsergroupAddOutlined, ShopOutlined, RightCircleOutlined, SettingOutlined } from '@ant-design/icons';

function UserPage() {
  const { companyInfo, userToken, userName } = useContext(UserContext)

  const { companyCounts, setCompanyCounts, pageControl, setPageControl, company, refreshCompanyData } = useContext(CompanyContext)
  console.log(companyCounts)
  useEffect(() => {
    getCompanyCounts()
  }, [refreshCompanyData])

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  }

  function getCompanyCounts() {
    const URL = `http://localhost:5000/get/countInfos/${company.companyId}`

    const promise = axios.get(URL, config)
    promise.then(response => {
      const { data } = response
      setCompanyCounts(data)
    })
    promise.catch(err => {
      console.log(err)
    })
  }

  return (
    <Body>

      {
        companyCounts === undefined ? (
          <>
            <H1Box>
              <H1>Welcome {userName}</H1>
            </H1Box>
            <p>calmae ae</p>
          </>
        ) : pageControl === "" ? (
          <>
            <H1Box>
              <H1>Welcome {userName}</H1>
            </H1Box>
            <CompaniesBoxes>
              <InfoBox>
                <InfoHeader>{company.name}</InfoHeader>
                <CountBoxes>

                  <CountBox>
                    <IconBox>
                      <ShopOutlined style={{ fontSize: "20px", marginRight: "7px" }} />
                      {companyCounts.unitCount}
                    </IconBox>
                    <NameBox>Units</NameBox>
                    <ArrowBox>
                      <RightCircleOutlined style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => setPageControl("units")} />
                    </ArrowBox>
                  </CountBox>

                  <CountBox style={{ background: "rgba(172, 172, 165, 0.3)"}}>
                    <IconBox>
                      <SettingOutlined style={{ fontSize: "20px", marginRight: "7px" }} />
                      {companyCounts.assetsCount}
                    </IconBox>
                    <NameBox>Assets</NameBox>
                    <ArrowBox>
                      {/* <RightCircleOutlined style={{ fontSize: "20px", cursor: "pointer" }} /> */}
                    </ArrowBox>
                  </CountBox>

                  <CountBox style={{ background: "rgba(172, 172, 165, 0.3)"}}>
                    <IconBox>
                      <UsergroupAddOutlined style={{ fontSize: "20px", marginRight: "7px" }} />
                      {companyCounts.usersCount}
                    </IconBox>
                    <NameBox>Users</NameBox>
                    <ArrowBox>
                      {/* <RightCircleOutlined style={{ fontSize: "20px", cursor: "pointer" }} /> */}
                    </ArrowBox>
                  </CountBox>

                </CountBoxes>
              </InfoBox>
            </CompaniesBoxes>
          </>
        ) : pageControl === "units" ? (
          <UnitsPage />
        ) : pageControl === "assetPage" ? (
          <AssetPage />
        ): (
          <></>
        )
      }
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
const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  width: 40vw;
  height: 40vh;
  border: solid 1px #dadada;
`
const InfoHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8vh;
  border-bottom: solid 1px #dadada;
  font-size: 25px;
  color: #0258e8;
`
const CountBoxes = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 35vw;
  height: 35vh;
`
const CountBox = styled.div`
  display: flex;
  width: 30vw;
  height: 8vh;
  border-radius: 12px;
  border: solid 1px #dadada;
`

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 7.8vh;
  border-right: solid 1px #dadada;
`

const NameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 20.7vw;
  height: 7.8vh;
  border-right: solid 1px #dadada;
`

const ArrowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 7.8vh;
`

export default UserPage;