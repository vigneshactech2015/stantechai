import { Box, Typography } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';
import useFinance from '../hooks/useFinance';
import { useEffect,useState } from 'react';

const CategoryBreakdown = () => {
    const {financialData,getFinancialData} = useFinance()
    const [pieChartData,setPieChartData] = useState([])

    useEffect(()=>{
        getFinancialData()
    },[])

    useEffect(()=>{
        const piechartConversion = []
        const colors = ["red","blue","green","yellow","pink","biege","grey","purple","orange","coral"]
        financialData.map((item)=>{
            if(item.type === 'expense'){
            piechartConversion.push({
                title : item.name,
                value : item.amount,
                color :  colors[Math.floor(Math.random()*10)]
            })
         }
        })

        setPieChartData(piechartConversion)
    },[financialData])

    return (
        <Box style={{width:"100%",height:"50vh"}}>
            <br/>
            <Typography variant='h5'>Expense CategoryBreakdown</Typography>
            <br/>
           { pieChartData?.length >= 1 && <PieChart
            data={pieChartData}
            label={(labelRenderProps)=>labelRenderProps.dataEntry.title}
            /> }
        </Box>
    )
}

export default CategoryBreakdown