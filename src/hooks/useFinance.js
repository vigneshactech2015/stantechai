import { useCallback,useMemo,useState } from "react";
import { getHttpClient } from "../api/axiosClient";


const useFinance = () => {
    const[loading,setLoading] = useState(false)
    const[expense,setExpense] = useState([])
    const[income,setIncome] = useState([])
    const[financialData,setFinancialData] = useState([])

    const getExpenses = useCallback(() => {
       const filteredExpense =  financialData?.filter((data)=>data?.type === 'expense')
       if(filteredExpense?.length >= 1){
        setExpense(filteredExpense)
       }
    },[])

    const getIncomes = useCallback(()=>{
        const filteredIncome = financialData?.filter((data)=>data?.type === 'income')
        if(filteredIncome.length >= 1){
            setIncome(filteredIncome)
        }
    },[])

    const getFinancialData = useCallback(async()=>{
        try{
            setLoading(true)
            const response = await getHttpClient(`financialdata`,'GET')
            setFinancialData(response)
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
            income,
            expense,
            financialData,
            getExpenses,
            getIncomes,
            getFinancialData,
            addNewFinancialData
        }
    },[loading,expense,income,financialData,getExpenses,getIncomes,getFinancialData,addNewFinancialData])

    return values
}

export default useFinance;