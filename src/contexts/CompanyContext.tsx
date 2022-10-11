import { createContext, useState } from "react";

const CompanyContext = createContext<any>(null)
export default CompanyContext

interface companyCount {
  unitCount: number;
  userCount: number;
  assetsCount: number;
}

interface company {
  companyId: string;
  name: string;
}

export function CompanyProvider({ children }: any) {
  const [companyCounts, setCompanyCounts] = useState<companyCount>()
  const [units, setUnits] = useState([])
  const [pageControl, setPageControl] = useState<string>("")
  const [company, setCompany] = useState<company>()
  const [assetInfo, setAssetInfo] = useState([])

  return (
    <CompanyContext.Provider value={{ companyCounts, setCompanyCounts, pageControl, setPageControl, units, setUnits, company, setCompany, assetInfo, setAssetInfo }}>
      { children }
    </CompanyContext.Provider>
  );
}