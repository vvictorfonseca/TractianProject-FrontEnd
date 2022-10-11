import styled from "styled-components"
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useState } from "react";

import AssetInfoBox from "./AssetInfoBox";

interface Props {
  open: boolean;
  height: any[];
  backgroundColor: string;
}

function UnitBox(props: any) {
  const [status, setStatus] = useState("")
  const [open, setOpen] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("")

  let runningAssets: any = []
  let alertingAssets: any = []
  let stoppedAssets: any = []

  const assets: any = {
    runningAssets,
    alertingAssets,
    stoppedAssets
  }

  props.assets.filter((info: any) => info.status == "Running" ? runningAssets.push(info) : info.status == "Alerting" ? alertingAssets.push(info) : info.status == "Stopped" ? stoppedAssets.push(info) : null)

  const options = {
    chart: {
      type: "pie"
    },
    title: {
      text: "Unit Assets Status"
    },

    series: [{
      data: [{
        name: 'Running',
        y: runningAssets.length,
        color: "rgba(59, 158, 44, 0.9)",
        events: {
          click: (() => {
            setStatus("runningAssets")
            open ? setOpen(false) : setOpen(true)
            setBackgroundColor("rgba(59, 158, 44, 0.5)")
          })
        }
      }, {
        name: 'Alert',
        y: alertingAssets.length,
        color: "rgba(180, 190, 40, 0.9)",
        events: {
          click: (() => {
            setStatus("alertingAssets")
            open ? setOpen(false) : setOpen(true)
            setBackgroundColor("rgba(180, 190, 40, 0.5)")
          }),
        }

      }, {
        name: 'Stopped',
        y: stoppedAssets.length,
        color: "rgba(158, 45, 45, 09)",
        events: {
          click: (() => {
            setStatus("stoppedAssets")
            open ? setOpen(false) : setOpen(true)
            setBackgroundColor("rgba(158, 45, 45, 0.5)")
          })
        }
      }],
    }]
  }

  return (
    <Box>
      <BoxHeader>
        <H2>{props.name}</H2>
      </BoxHeader>
      <BoxAssets>
        <HighchartsReact
          containerProps={{ style: { height: "170px", width: "260px" } }}
          highcharts={Highcharts}
          options={options}
        />
      </BoxAssets>
      <InfoBox open={open} height={assets[status]} backgroundColor={backgroundColor} >
        {
          status ? (
            assets[status].map((info: any, index: number) => {
              return (<AssetInfoBox key={index} {...info} />)
            })
          ) : (
            <></>
          )
        }
      </InfoBox>
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 280px;
  height: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  cursor: pointer;
`
const BoxHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 45px;
  border-bottom: solid 1px #dadada;
`
const H2 = styled.h2`
  text-align: center;
  font-size: 14px;
`
const BoxAssets = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 260px;
  height: 170px;
  margin: auto auto;
  //margin-bottom: 10px;
  border-bottom: solid 1px #dadada;
  border-radius: 8px;
`
const InfoBox = styled.div.attrs<Props>(props => ({
  style: {
    height: ((props.height?.length ?? 0) * 30),
    backgroundColor: (props.backgroundColor)
  },
})) <Props>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 260px;
  //height: 0px;
  border-radius: 8px;
  //background-color: #dadada;
  transition: height 0.5s;
  overflow: hidden;
`
const Span = styled.span`
  font-size: 14px;
  margin-left: 5px;
`

export default UnitBox