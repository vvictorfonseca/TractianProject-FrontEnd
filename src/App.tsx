import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import GlobalStyle from "./assets/globalStyle";
import HomePage from "./components/Homepage";

import UserContext from "./contexts/userContext";



function App() {
  type company = {
    name: String;
    isAdm: Boolean;
  }

  const tokenStorage: any = localStorage.getItem('token');
  const token: string = JSON.parse(tokenStorage)

  const [companies, setCompanies] = useState([])
  const [companyInfo, setCompanyInfo] = useState(null)
  const [newCompany, setNewCompany] = useState("")

  const [userName, setUserName] = useState("")
  const [userToken, setUserToken] = useState(token)
  const [isAdm, setIsAdm] = useState("")
  const [logAdmin, setLogAdmin] = useState("")

  const userContextValue = { userName, setUserName, userToken, setUserToken, isAdm, setIsAdm, logAdmin, setLogAdmin, companies, setCompanies, companyInfo, setCompanyInfo, newCompany, setNewCompany }

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserContext.Provider value={userContextValue}>
          <Routes>
            <Route path={"/"} element={<HomePage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;