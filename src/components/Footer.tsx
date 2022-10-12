import styled from "styled-components"

function Footer() {
  return (
    <FooterContainer>
      <H1>Created By Victor Fonseca | https://github.com/vvictorfonseca/ | https://www.linkedin.com/in/victorhfonseca/</H1>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  width: 100vw;
  height: 8%;
  position: fixed;
  justify-content: center;
  align-items: center;
  bottom: 0;
  z-index: -10;
  margin-top: 15px;
  //background-color: green;
`
const H1 = styled.h1`
  font-size: 14px;
  text-align: center;
  color: #919090;
`

export default Footer