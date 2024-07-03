import { Box, Typography } from "@mui/material"
import { useEffect,useState } from "react"
import useFinance from "../hooks/useFinance";
import CircularProgress from '@mui/material/CircularProgress';

const Summary = () => {
    const {financialData,getFinancialData,loading} = useFinance()
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
             <br/>
            <Typography variant="h5">Summary</Typography> 
            <br/>
           
            {loading &&   
                <Box className="loadercontainer">
                <CircularProgress color="secondary" />
                </Box>
            }

           {!loading && <div className="summaryContainer">
                <div className='summaryItems'>
           {income !== 0 && <Typography variant="body1">Total Income {income}</Typography>}
                </div>
                <div className='summaryItems'>
           {expense !== 0 && <Typography variant="body1">Total Expense {expense} </Typography>}
           </div>
           <div className='summaryItems'>
           { income !== 0  && expense !== 0 && <Typography variant="body1">Balance {income-expense} </Typography> }
           </div>
           </div> }


        </Box>
    )
}

export default Summary