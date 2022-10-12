import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components"

import UserContext from "../contexts/userContext";

import { UserAddOutlined, ShopOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd'

import CompaniesToCreateUser from "./CompaniesToCreateUser";
import CreatUser from "./CreateUser";

function AdmPage() {
  const [companyName, setCompanyName] = useState("")

  const { userToken, companyInfo, newCompany, setNewCompany } = useContext(UserContext)

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  }

  interface newCompany  {
    name: string;
  }

  const objNewCompany = {
    name: companyName
  }

  function createNewCompany()  {
    const URL = "https://tractian-project-vh.herokuapp.com/create/company"

    const promise = axios.post(URL, objNewCompany, config)
    promise.then(response => {
      alert("Company Created")
      setNewCompany("")
    })
    promise.catch(err => {
      console.log(err)
    })
  }

  return (
    <Body>
      {
        newCompany == "" ? (
          <>
            <H1Box>
              <H1>What do you want to create?</H1>
            </H1Box>

            <CompaniesBoxes>
              <Box onClick={() => setNewCompany("true")}>
                <ShopOutlined />
                <H2>New Company</H2>
              </Box>
              <Box onClick={() => setNewCompany("false")}>
                <UserAddOutlined />
                <H2>New User</H2>
              </Box>
            </CompaniesBoxes>
          </>

        ) : newCompany === "true" ? (
          <>
            <H1Box>
              <H1>Write the name of the new company below</H1>
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
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button style={{ marginRight: "50px" }} type="primary" htmlType="submit" className="login-form-button" onClick={() => setNewCompany("")}>
                    Back
                  </Button>
                  <Button style={{ marginLeft: "28px" }} type="primary" htmlType="submit" className="login-form-button" onClick={() => createNewCompany()}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </CompaniesBoxes>
          </>

        ) : newCompany === "false" ? (
          
          companyInfo === null  ? (
              <CompaniesToCreateUser />
            ) : (
              < CreatUser/>
            ) 
          

        ) : (
          <></>
        )
      }
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
  font-size: 20px;
  color: white;
`
const CompaniesBoxes = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 50vw;
  //height: 100vh;
  margin-top: 15px;
  background-color: #f5f5f5;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  margin-top: 25px;
  margin-bottom: 25px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  cursor: pointer;
`
const H2 = styled.h2`
  margin-left: 10px;
  font-size: 18px;
`

export default AdmPage