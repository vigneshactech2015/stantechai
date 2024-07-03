import { Box, Typography } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';
import useFinance from '../hooks/useFinance';
import { useEffect,useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const CategoryBreakdown = () => {
    const {financialData,getFinancialData,loading} = useFinance()
    const [pieChartData,setPieChartData] = useState([])

    useEffect(()=>{
        getFinancialData()
    },[])

    useEffect(()=>{
        if(financialData.length>=1){

            const colors = ["red", "blue", "green", "yellow", "pink", "violet", "grey", "purple", "orange", "coral"];
            const piechartConversion = financialData
                .filter(item => item.type === 'expense')
                .map((item, index) => ({
                    title: item.name,
                    value: parseInt(item.amount),
                    color: colors[index % colors.length]
                }));

            setPieChartData(piechartConversion);
        }
       
    },[financialData])

    return (
        <Box style={{width:"100%",height:"50vh"}}>
            <br/>
            <Typography variant='h5'>Expense CategoryBreakdown</Typography>
            <br/>
            {loading &&   
                <Box className="loadercontainer">
                <CircularProgress color="secondary" />
                </Box>
            }

           { !loading && pieChartData?.length >= 1 && <PieChart
            data={pieChartData}
            label={(labelRenderProps)=>labelRenderProps.dataEntry.title}
            labelStyle={{
                fontSize: '6px',
                fill:'white'
            }}
            /> }
        </Box>
    )
}

export default CategoryBreakdown