import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components"

import { ShopOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd'

import UserContext from "../contexts/userContext";
import CompanyContext from "../contexts/CompanyContext";

function CreateUnit() {
  const [unitName, setUnitName] = useState("")
  const { userToken } = useContext(UserContext)
  const { setOpenNewUnitForm, company, refreshCompanyData, setRefreshCompanyData, setPageControl } = useContext(CompanyContext)

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  }

  interface NewUnit {
    name: string;
    companyId: string
  }

  const objNewCompany: NewUnit = {
    name: unitName,
    companyId: company.companyId
  }

  function createUnit() {
    const URL = "https://tractian-project-vh.herokuapp.com/create/unit"

    const promise = axios.post(URL, objNewCompany, config)
    promise.then(() => {
      message.success('Unit Created');
      refreshCompanyData ? setRefreshCompanyData(false) : setRefreshCompanyData(true)
      setOpenNewUnitForm(false)
      setPageControl("")
    })
  }

  return (
    <Body>
      <H1Box>
        <H1>Create new unit for {company.name}</H1>
      </H1Box>

      <CompaniesBoxes>
        <Form
          style={{ marginTop: "15px", display: "flex", justifyContent: "center", flexDirection: "column" }}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            style={{ marginTop: "15px" }}
            name="e-mail"
            rules={[{ required: true, message: 'Please input the name of the new company!' }]}
          >
            <Input
              prefix={<ShopOutlined
                className="site-form-item-icon" />}
              placeholder="Unit Name"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button style={{ marginRight: "50px" }} type="primary" htmlType="submit" className="login-form-button" onClick={() => {
              setPageControl("")
              setOpenNewUnitForm(false)
            }}>
              Back
            </Button>
            <Button style={{ marginLeft: "28px" }} type="primary" htmlType="submit" className="login-form-button" onClick={() => createUnit()} >
              Submit
            </Button>
          </Form.Item>
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

export default CreateUnit