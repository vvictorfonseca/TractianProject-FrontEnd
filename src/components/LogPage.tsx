import { useState, useContext, useReducer } from "react";
import axios from "axios";
import styled from "styled-components"

import UserContext from "../contexts/userContext";
import CompanyContext from "../contexts/CompanyContext";

import { LockOutlined, UserOutlined, IdcardOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

function LogPage() {

  const { setUserName, setUserToken, setIsAdm, setLogAdmin, logAdmin } = useContext(UserContext)
  const { company } = useContext(CompanyContext)
  
  interface userData {
    fullName: String;
    token: String;
    email: String;
    isAdm: Boolean;
  }

  interface login {
    email: String;
    password: String;
  }

  const [admLogin, setAdmLogin] = useState({ email: "", password: "" })

  const objLogin: login = {
    email: admLogin.email,
    password: admLogin.password
  }

  function logInAsAdmin() {

    let URL = ""

    if (logAdmin === "true") {
      URL = "https://tractian-project-vh.herokuapp.com/adm/signIn"
    } else if (logAdmin === "false") {
      URL = `https://tractian-project-vh.herokuapp.com/signIn/${company.companyId}`
    }

    const promise = axios.post(URL, objLogin)
    promise.then(response => {
      const { data } = response
      const token: string = JSON.stringify(data.token)
      const userName: string = JSON.stringify(data.fullName)
      localStorage.setItem('token', token)
      localStorage.setItem('userName', userName)

      setUserName(data.fullName)
      setUserToken(data.token)

      if (logAdmin === "true") {
        setIsAdm(true)
        setLogAdmin(null)
      } else if (logAdmin === "false") {
        setIsAdm(false)
        setLogAdmin(null)
      }
    })
    promise.catch(err => {
      console.log(err)
    })
  }


  return (
    <Body>
      <>

        {
          logAdmin === "true" ? (
            <H1Box>
              <H1>Log as admin to create companies or register new users</H1>
            </H1Box>
          ) : logAdmin === "false" ? (
            <H1Box>
              <H1>Login to have access to your company's units and assets</H1>
            </H1Box>
          ) : (
            <></>
          )
        }

        <CompaniesBoxes>

          <Form
            style={{ marginTop: "15px", display: "flex", justifyContent: "center", flexDirection: "column" }}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
          >
            <IdcardOutlined style={{ fontSize: "50px" }} />
            <Form.Item
              style={{ marginTop: "15px" }}
              name="e-mail"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined
                  className="site-form-item-icon" />}
                placeholder="E-mail"
                value={admLogin.email}
                onChange={(e) => setAdmLogin({ ...admLogin, email: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                value={admLogin.password}
                onChange={(e) => setAdmLogin({ ...admLogin, password: e.target.value })}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item style={{ display: "flex", justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => logInAsAdmin()}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </CompaniesBoxes>
      </>
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
  font-size: 20px;
  color: white;
`
const CompaniesBoxes = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 50vw;
  //height: 100vh;
  margin-top: 15px;
  background-color: #f5f5f5;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

export default LogPage