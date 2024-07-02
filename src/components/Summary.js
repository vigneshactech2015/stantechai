import { Box, Typography } from "@mui/material"
import { useEffect,useState } from "react"
import useFinance from "../hooks/useFinance"

const Summary = () => {
    const {financialData,getFinancialData} = useFinance()
    const [income,setIncome] = useState(0)
    const [expense,setExpense] = useState(0)
    
    useEffect(()=>{
        getFinancialData()
    },[])

    useEffect(()=>{
        let totalIncome = 0
        let totalExpense = 0
        financialData?.map((data)=>{
            if(data.type === "income"){
                totalIncome = totalIncome + parseInt(data?.amount)
            } else {
                totalExpense = totalExpense + parseInt(data?.amount)
            }
        })
        setIncome(totalIncome)
        setExpense(totalExpense)
    },[financialData])
   
    return (
        <Box>
            <Typography variant="h4">Summary</Typography>
           {income !== 0 && <Typography variant="h4">Total Income {income}</Typography>}
           {expense !== 0 && <Typography variant="h4">Total Expense {expense} </Typography>}
           { income !== 0  && expense !== 0 && <Typography variant="h4">Balance {income-expense} </Typography> }
        </Box>
    )
}

export default Summary