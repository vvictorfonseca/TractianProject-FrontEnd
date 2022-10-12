import { useContext, useState } from "react"
import axios from "axios";
import styled from "styled-components"

import { Button, Form, Input, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons';

import UserContext from "../contexts/userContext"

interface companyInfo {
  id: String;
  name: String;
  isAdm: Boolean;
}

interface userObj {
  email: string;
  password: string;
  fullName: string;
  companyId: string;
}

function CreatUser() {
  const { companyInfo, setCompanyInfo, setNewCompany, userToken } = useContext(UserContext)
  console.log("companyInfo", companyInfo.id)

  const [userInfo, setUserInfo] = useState({ email: "", password: "", fullName: "", companyId: companyInfo.id })

  const objCreateNewUser: userObj = {
    email: userInfo.email,
    password: userInfo.password,
    fullName: userInfo.fullName,
    companyId: userInfo.companyId
  }

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  }

  function createNewUser() {
    const URL = "https://tractian-project-vh.herokuapp.com/create/user"

    const promise = axios.post(URL, objCreateNewUser, config)
    promise.then(response => {
      message.success(`user Created on company ${companyInfo.name}`)
      setNewCompany("")
      setCompanyInfo(null)
    })
    promise.catch(err => {
      console.log(err)
    })
  }

  return (
    <Body>
      <H1Box>
        <H1>Create new user to {companyInfo.name} </H1>
      </H1Box>

      <CompaniesBoxes>
        <Form
          name="register"
          scrollToFirstError
          style={{ marginTop: "15px", display: "flex", justifyContent: "center", flexDirection: "column" }}
        >
          <UserAddOutlined style={{ fontSize: "50px" }} />
          <Form.Item
            style={{ marginTop: "15px" }}
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password value={userInfo.password} onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Full Name"
            tooltip="Input your fullname here"
            rules={[{ required: true, message: 'Please input your full name!', whitespace: true }]}
          >
            <Input value={userInfo.fullName} onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })} />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: "center", marginTop: "5px" }}>
            <Button style={{ marginRight: "25px", marginTop: "5px" }} type="primary" className="login-form-button" onClick={() => {
              setNewCompany("")
              setCompanyInfo(null)
            }}>
              Back
            </Button>
            <Button type="primary" htmlType="submit" style={{ marginTop: "5px", marginLeft: "25px" }} onClick={() => createNewUser()}>
              Register
            </Button>
          </Form.Item>

        </Form>
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
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 50vw;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #f5f5f5;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

export default CreatUser;