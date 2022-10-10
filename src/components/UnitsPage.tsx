import { useContext, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"

import UserContext from "../contexts/userContext"
import CompanyContext from "../contexts/CompanyContext"

import UnitBox from "./UnitBox"

function UnitsPage() {
  const { companyInfo, userToken } = useContext(UserContext)
  
  const { setPageControl, units, setUnits } = useContext(CompanyContext)

  useEffect(() => {
    getCompanyUnits()
  }, [])

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  }

  function getCompanyUnits() {
    const URL = `http://localhost:5000/get/units/${companyInfo.id}`

    const promise = axios.get(URL, config)
    promise.then(response => {
      const { data } = response
      setUnits(data)
    })
    promise.catch(err => {
      console.log(err)
    })
  } 

  return (
    <CompaniesBoxes>
        {
          units.map((info: any, index: number) => {
            return(<UnitBox key={index} {...info} />)
          })
        }
    </CompaniesBoxes>
  )
}

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

export default UnitsPage