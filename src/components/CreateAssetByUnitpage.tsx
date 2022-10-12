import { useState, useContext } from "react"
import axios from "axios"
import styled from "styled-components"

import {
  Form,
  Input,
  Button,
  message,
  InputNumber,
} from 'antd';

import { SettingOutlined } from '@ant-design/icons';

import CompanyContext, { AssetInfo } from "../contexts/CompanyContext"
import UserContext from "../contexts/userContext"

const { TextArea } = Input;

function CreateAssetByUnitPage() {
  const { userToken } = useContext(UserContext)
  const { assetInfo, company, setCreateForm, refreshCompanyData, setRefreshCompanyData, setPageControl, unitId } = useContext(CompanyContext)
  const asset: AssetInfo = assetInfo

  const [value, setValue] = useState<string | number | null>("");

  interface CreateAssetInfo {
    description: string;
    healthLevel: number | string | null;
    model: string;
    name: string;
    owner: string;
    status: string;
    image: string;
    unitId: string;
  }

  const [createAsset, setCreateAsset] = useState<CreateAssetInfo>({
    name: "",
    image: "",
    model: "",
    description: "",
    owner: company.name,
    healthLevel: "",
    status: "",
    unitId: unitId
  })

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  }

  const objCreateAsset = {
    name: createAsset.name,
    image: createAsset.image,
    model: createAsset.model,
    description: createAsset.description,
    owner: createAsset.owner,
    healthLevel: value,
    status: "",
    unitId: createAsset.unitId
  }

  function createNewAsset() {
    const URL = "https://tractian-project-vh.herokuapp.com/create/asset"

    if (objCreateAsset.healthLevel !== null && objCreateAsset.healthLevel < 20) {
      objCreateAsset.status = "Stopped"
    } else if (objCreateAsset.healthLevel !== null && objCreateAsset.healthLevel < 60) {
      objCreateAsset.status = "Alerting"
    } else {
      objCreateAsset.status = "Running"
    }

    const promise = axios.post(URL, objCreateAsset, config)
    promise.then(() => {
      message.success('Asset Created');
      refreshCompanyData ? setRefreshCompanyData(false) : setRefreshCompanyData(true)
      setPageControl("")
      setCreateForm(false)
    })
    promise.catch(err => {
      console.log(err)
    })
  }

  return (
    <Body>
      <H1Box>
        <H1>Create new asset</H1>
      </H1Box>

      <CompaniesBoxes>
        <Form
          style={{ marginTop: "15px", display: "flex", justifyContent: "center", flexDirection: "column" }}
          labelCol={{ span: 4 }}
          layout="horizontal"
        >
          <SettingOutlined style={{ fontSize: "50px" }} />
          <Form.Item style={{ marginTop: "15px" }}>
            <Input
              placeholder="Name"
              value={createAsset.name}
              onChange={(e) => setCreateAsset({ ...createAsset, name: e.target.value })} />
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="Image"
              value={createAsset.image}
              onChange={(e) => setCreateAsset({ ...createAsset, image: e.target.value })} />
          </Form.Item>

          <Div>
            <Form.Item>
              <InputNumber
                min={-100} max={200}
                placeholder="HealthLevel"
                value={value} onChange={setValue} />
            </Form.Item>
            <Form.Item style={{ marginLeft: 8 }}>
              <Input
                placeholder="Model"
                value={createAsset.model}
                onChange={(e) => setCreateAsset({ ...createAsset, model: e.target.value })} />
            </Form.Item>
          </Div>

          <Form.Item>
            <TextArea
              rows={2}
              placeholder="Type the description..."
              value={createAsset.description}
              onChange={(e) => setCreateAsset({ ...createAsset, description: e.target.value })} />
          </Form.Item>
          <Div>
            <Form.Item >
              <Button onClick={() => setPageControl("units")}>Return</Button>
            </Form.Item>
            <Form.Item >
              <Button onClick={() => createNewAsset()}>Register</Button>
            </Form.Item>
          </Div>
        </Form>
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
  text-align: center;
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
const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
`
export default CreateAssetByUnitPage