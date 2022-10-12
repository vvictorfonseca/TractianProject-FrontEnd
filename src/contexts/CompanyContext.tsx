import { createContext, useState } from "react";

const CompanyContext = createContext<any>(null)
export default CompanyContext

interface CompanyCount {
  unitCount: number;
  userCount: number;
  assetsCount: number;
}

interface Company {
  companyId: string;
  name: string;
}

export interface AssetInfo {
  description: string;
  healthLevel: number;
  id: string;
  model: string;
  name: string;
  owner: string;
  status: string;
  image: string;
  unitId: string;
}

export function CompanyProvider({ children }: any) {
  const [companyCounts, setCompanyCounts] = useState<CompanyCount>()
  const [units, setUnits] = useState([])
  const [pageControl, setPageControl] = useState<string>("")
  const [company, setCompany] = useState<Company>()
  const [assetInfo, setAssetInfo] = useState<AssetInfo>()
  const [backgroundColor, setBackgroundColor] = useState<string>("")
  const [refreshCompanyData, setRefreshCompanyData] = useState<boolean>(false)

  const unitNameStorage: any = localStorage.getItem('unitName');
  const unitNameParse: string = JSON.parse(unitNameStorage)
  const [unitName, setUnitName] = useState(unitNameParse)
  const [unitId, setUnitId] = useState("")
  const [createForm, setCreateForm] = useState(false)
  const [openNewUnitForm, setOpenNewUnitForm] = useState(false)

  return (
    <CompanyContext.Provider value={{ companyCounts, setCompanyCounts, pageControl, setPageControl, units, setUnits, company, setCompany, assetInfo, setAssetInfo, backgroundColor, setBackgroundColor, refreshCompanyData, setRefreshCompanyData, unitName, setUnitName, unitId, setUnitId, createForm, setCreateForm, openNewUnitForm, setOpenNewUnitForm }}>
      { children }
    </CompanyContext.Provider>
  );
}