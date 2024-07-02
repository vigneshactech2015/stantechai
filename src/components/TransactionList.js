import { Box, Typography } from "@mui/material"
import { useEffect,useState } from "react"
import useFinance from "../hooks/useFinance"

const TransactionList = () => {
    const {getFinancialData,financialData} = useFinance()
    const [transactionLists,setTransactionLists] = useState([])

    useEffect(()=>{
        getFinancialData()
    },[])

    useEffect(()=>{
        if(financialData){
            setTransactionLists([...financialData])
        }
    },[financialData])

    return(
        <Box>
            <Typography variant="h4">TransactionList</Typography>
            {transactionLists?.length >= 1 && transactionLists?.map((data,index)=>{
                return (<Box key={index}>
                <p>{data?.name || 'No Name'}</p>
                </Box>)
            })}
        </Box>
    )
}

export default TransactionList