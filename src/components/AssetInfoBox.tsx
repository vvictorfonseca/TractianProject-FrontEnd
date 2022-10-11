import { useContext } from "react"
import styled from "styled-components"

import CompanyContext from "../contexts/CompanyContext"

function AssetInfoBox(props: any) {
  const { setPageControl, setAssetInfo } = useContext(CompanyContext)
  
  return (
    <AssetInfo onClick={() => {
      setPageControl("assetPage")
      setAssetInfo(props)
    }}>
      <p>{props.name}</p>
    </AssetInfo>
  )
}

const AssetInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  border-radius: 5px;
  border: solid 1px #e7e7e7;
  background-color: #fff;
`
export default AssetInfoBox