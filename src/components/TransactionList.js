import { Box, Typography } from "@mui/material";
import { useEffect,useState } from "react";
import useFinance from "../hooks/useFinance";
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
    { field: 'createdAt', headerName: 'Transaction Date', width: 200 },
    { field: 'name', headerName: 'Transaction Name', width: 400 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 300,
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
    const {getFinancialData,financialData,loading} = useFinance()
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
        <Box style={{width: '95%'}}>
          <br/>
            <Typography variant="h5">Transaction List</Typography>
          <br/>
          {loading &&   
                <Box className="loadercontainer">
                <CircularProgress color="secondary" />
                </Box>
            }
            {!loading && <DataGrid
            rows={transactionLists}
            columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10,25]}
      />}

        </Box>
    )
}

export default TransactionList