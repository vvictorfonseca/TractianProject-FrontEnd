import { createContext, useState } from "react";

const CompanyContext = createContext<any>(null)
export default CompanyContext

interface companyCount {
  unitCount: number;
  userCount: number;
  assetsCount: number;
}

export function CompanyProvider({ children }: any) {
  const [companyCounts, setCompanyCounts] = useState<companyCount>()
  const [units, setUnits] = useState([])
  const [pageControl, setPageControl] = useState<string>("")

  return (
    <CompanyContext.Provider value={{ companyCounts, setCompanyCounts, pageControl, setPageControl, units, setUnits }}>
      { children }
    </CompanyContext.Provider>
  );
}