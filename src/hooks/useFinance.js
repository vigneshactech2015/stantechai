import { useCallback,useMemo,useState } from "react";
import { getHttpClient } from "../api/axiosClient";


const useFinance = () => {
    const[loading,setLoading] = useState(false)
    const[financialData,setFinancialData] = useState([])


    const getFinancialData = useCallback(async()=>{
        try{
            setLoading(true)
            const response = await getHttpClient(`financialdata`,'GET')
            // SORTING by date
            const sortedByDate = response?.sort((a, b) => {
                let dateA = new Date(a.createdAt);
                let dateB = new Date(b.createdAt);
                
                if (dateA < dateB) {
                    return -1;
                }
                if (dateA > dateB) {
                    return 1;
                }
                return 0;
            });
            setFinancialData(sortedByDate)
            setLoading(false)
        }catch(error){
            setLoading(false)
            setFinancialData([])
        }
    },[])

    const addNewFinancialData = useCallback(async(data)=>{
        try{
            await getHttpClient('financialdata','POST',data)
            getFinancialData()
        }catch(error){
            console.log(error)
        }
    },[])

    const values = useMemo(()=>{

        return {
            loading,
            financialData,
            getFinancialData,
            addNewFinancialData
        }
    },[loading,financialData,getFinancialData,addNewFinancialData])

    return values
}

export default useFinance;