import { Box, Typography } from "@mui/material";
import { useEffect,useState } from "react";
import useFinance from "../hooks/useFinance";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'S.No', width: 100 },
    { field: 'createdAt', headerName: 'Transaction Date', width: 150 },
    { field: 'name', headerName: 'Transaction Name', width: 300 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 100,
      renderCell: (row)=>{
        return <span style={{color : row?.row?.type === 'income' ? "green" : "red"}}>{row?.row?.amount || 'No Amount'}</span>
      }
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 160,
    }
  ];

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
        <Box style={{width: '65%' }}>
            <Typography variant="h4">Transaction List</Typography>

            <DataGrid
            rows={transactionLists}
            columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10,25]}
      />

        </Box>
    )
}

export default TransactionList