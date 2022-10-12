import { useContext, useEffect, useState } from "react"
import axios from "axios";
import styled from "styled-components"

import { Progress } from 'antd';
import { Switch } from 'antd';
import { InputNumber } from 'antd';
import { Tooltip } from 'antd';
import { LeftCircleOutlined, PlusCircleOutlined, DeleteOutlined, ExclamationCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { Alert } from 'antd';

import UserContext from "../contexts/userContext";
import CompanyContext, { AssetInfo } from "../contexts/CompanyContext"

import CreateAsset from "./CreateAsset";

const { confirm } = Modal;

function AssetPage() {
  const { assetInfo, backgroundColor, setBackgroundColor, setPageControl, company, refreshCompanyData, setRefreshCompanyData, createForm, setCreateForm } = useContext(CompanyContext)
  const asset: AssetInfo = assetInfo

  const { userToken } = useContext(UserContext)

  const [updateOpen, setUpdateOpen] = useState(false)
  const [value, setValue] = useState<number | null>(asset.healthLevel);
  console.log("value", value)

  const [status, setStatus] = useState<string | null>(null)

  

  const onChange = (checked: boolean) => {
    !checked ? setUpdateOpen(false) : setUpdateOpen(true)
  };

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete this Asset?',
      icon: <ExclamationCircleOutlined />,
      content: 'This asset will be deleted from your unit data',
      onOk() {
        deleteAsset();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  }

  const objUpdateHealthLevel = {
    id: asset.id,
    healthLevel: value
  }

  function updateHealthLevel() {
    const URL = `http://localhost:5000/update/healthLevel`

    const promise = axios.put(URL, objUpdateHealthLevel, config)
    promise.then(response => {
      let newStatus: string | null
      if(value !== null && value < 20) {
        setStatus("Stopped")
        newStatus = "Stopped"
        setBackgroundColor("rgba(158, 45, 45, 0.5)")
      } else if (value !== null && value < 60) {
        setStatus("Alerting")
        newStatus = "Alerting"
        setBackgroundColor("rgba(180, 190, 40, 0.5)")
      } else {
        setStatus("Running")
        newStatus = "Running"
        setBackgroundColor("rgba(59, 158, 44, 0.5)")
      }
      console.log("atualizou")
      refreshCompanyData ? setRefreshCompanyData(false) : setRefreshCompanyData(true)
      updateStatus(newStatus)
    }).catch(err => {
      console.log(err)
    })
  }

  const objUpdate = {
    id: asset.id,
    status: status
  }

  function updateStatus(status: string) {
    const URL = `http://localhost:5000/update/status`

    objUpdate.status = status

    const promise = axios.put(URL, objUpdate, config)
    promise.then(response => {
      console.log("atualizou o status")
      alert("Updated")
    }).catch(err => {
      console.log(err)
    })
  }

  function deleteAsset() {
    const URL = `http://localhost:5000/delete/${asset.id}`

    const promise = axios.delete(URL, config)
    promise.then(() => {
      <Alert message="Successfully Deleted" type="success" showIcon />
      refreshCompanyData ? setRefreshCompanyData(false) : setRefreshCompanyData(true)
      setPageControl("")
    })
    promise.catch(err => {
      console.log(err)
    })
  }

  return (
    <Body>
      {
        createForm ? (
          <CreateAsset />
        ) : (
          <>
            <H1Box>
              <H1>Asset management page</H1>
            </H1Box >

            <CompaniesBoxes>

              <AssetBox>

                <DivideInfos>

                  <PrimaryInfos style={{ backgroundColor: backgroundColor }}>
                    <Info>Name: {asset.name}</Info>
                    <Info>Model: {asset.model}</Info>
                  </PrimaryInfos>

                  <StatusBoX>
                    <DivideStausBox>
                      <Status>Status</Status>
                    </DivideStausBox>

                    <DivideStausBox>
                      <StatusName>{status?? assetInfo.status}</StatusName>
                      <ColorBox style={{ backgroundColor: backgroundColor, boxShadow: `0 0 10px ${backgroundColor}` }}></ColorBox>
                    </DivideStausBox>
                  </StatusBoX>

                </DivideInfos>

                <Line></Line>

                <DivideInfos>
                  <PrimaryInfos style={{ backgroundColor: backgroundColor }}>
                    <Info>Description: {asset.description}</Info>
                  </PrimaryInfos>

                  <StatusBoX>
                    <DivideStausBox>
                      <Status>Health Level</Status>
                    </DivideStausBox>

                    <DivideStausBox>
                      <UpdateBox>
                        <Tooltip title="click to update">
                          <Switch style={{ marginLeft: "5px", fontSize: "10px" }} onChange={onChange} size={'small'} />
                        </Tooltip>
                        {
                          updateOpen ? (
                            <UpdateInput>
                              <InputNumber size={'small'} min={1} max={100} value={value} onChange={setValue} />
                              <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "5px" }} type="primary" shape="circle" icon={<SendOutlined style={{ marginLeft: "3px", fontSize: "12px" }} />} size='small' onClick={() => updateHealthLevel()} />
                            </UpdateInput>
                          ) : (
                            <></>
                          )
                        }
                      </UpdateBox>
                      <ProgressBox>
                        <Progress style={{ paddingLeft: "10px", paddingRight: "10px" }} percent={value?? undefined} status="active" />
                      </ProgressBox>
                    </DivideStausBox>
                  </StatusBoX>
                </DivideInfos>
              </AssetBox>

              <Footer>
                <Tooltip title="Return">
                  <ButtonBox style={{ borderRight: "solid 1px #dadada", cursor: 'pointer' }} onClick={() => setPageControl("units")}>
                    <LeftCircleOutlined style={{ fontSize: "20px" }} />
                  </ButtonBox>
                </Tooltip>
                <Tooltip title="Create Asset">
                  <ButtonBox style={{ border: "solid 1px #dadada", backgroundColor: "#0258e8", cursor: 'pointer' }} onClick={() => setCreateForm(true)}>
                    <PlusCircleOutlined style={{ fontSize: "20px", color: "#fff" }} />
                  </ButtonBox>
                </Tooltip>
                <Tooltip title="Delete Asset">
                  <ButtonBox style={{ borderLeft: "solid 1px #dadada", cursor: 'pointer' }} onClick={showConfirm}>
                    <DeleteOutlined style={{ fontSize: "20px" }} />
                  </ButtonBox>
                </Tooltip>
              </Footer>

            </CompaniesBoxes>
          </>
        )
      }
    </Body >
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
const AssetBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  //align-items: center;
  width: 45vw;
  //height: 150px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: solid 1px #dadada;
  border-end-end-radius: 8px;
  border-bottom-left-radius: 8px;
`
const DivideInfos = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  margin-top: 15px;
  margin-top: 15px;
`
const Line = styled.div`
  width: 0.2px;
  height: 100%;
  background-color: #dadada;
`
const PrimaryInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 6vh;
  border: solid 1px #dadada;
  border-radius: 8px;
`
const Info = styled.p`
  text-align: center;
  font-size: 12px;
  font-weight: 400;

  &:first-of-type{
    font-size: 14px;
    font-weight: 700;
  }
`
const StatusBoX = styled.div`
  display: flex;
  //flex-direction: column;
  width: 20vw;
  height: 15vh;
  margin-top: 10px;
  //background-color: red;
`
const DivideStausBox = styled.div`
  display:flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 13.79vw;
  //height: 12vh;
  border-top: solid 1px #dadada;

  &:first-child {
    width: 6vw;
    border-right: solid 1px #dadada;
    justify-content: center;
    align-items: center;
  }
`
const Status = styled.h1`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`
const StatusName = styled.h1`
  margin: auto auto;
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
`
const ColorBox = styled.div`
  margin: auto auto;
  margin-top: -5px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
`
const ProgressBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 10px;
  background-color: #e6e1e1;
`
const UpdateBox = styled.div`
  display: flex;
  margin-left: 5px;
  margin-right: 5px;
  //background-color: #e6e1e1;
`
const UpdateInput = styled.div`
  margin-top: -3px;
  margin-left: 10px;
  display: flex;
  transition: height 2s;
  overflow: hidden;
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45vw;
  height: 8vh;
  border-radius: 8px;
  border: solid 1px #dadada;
  //background-color: gray;
  margin-bottom: 15px;
`
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //border-right: solid 1px #dadada;
  border-radius: 100px;
  width: 5vw;
  height: 8vh;
  //background-color: green;
`

export default AssetPage