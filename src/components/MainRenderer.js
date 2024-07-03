import {useState} from "react";
import AddTransaction from "./AddTransaction";
import CategoryBreakdown from "./CategoryBreakdown";
import Summary from "./Summary";
import TransactionList from "./TransactionList";
import { Box,Typography,useMediaQuery } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PieChartIcon from '@mui/icons-material/PieChart';

const MainRenderer = () => {
    const [selectedComponent,setSelectedComponent] = useState(<TransactionList/>)
    const [value, setValue] = useState(2);
    const isFullScreen = useMediaQuery('(min-width:650px)');

    const sections = [<AddTransaction/>,<Summary/>,<TransactionList/>,<CategoryBreakdown/>]

    const handleChange = (event, newValue) => {
        setSelectedComponent(sections[newValue])
        setValue(newValue);
    };

    return (
        <Box style={{paddingLeft:"2%"}}> 
            <br/>
        <Typography variant="h5" className="productname">Personal Finance Tracker</Typography><br/>
        <Box>
        <Tabs value={value} onChange={handleChange} 
         aria-label="icon label tabs example" 
         textColor="secondary" indicatorColor="secondary"
         scrollButtons
         allowScrollButtonsMobile
         variant={isFullScreen ? "fullWidth" : "scrollable"}>
      <Tab icon={<AddBoxSharpIcon/>} label="Add Transaction" />
      <Tab icon={<ReceiptIcon />} label="Summary" />
      <Tab icon={<AccountBalanceIcon />} label="TransactionList" />
      <Tab icon={<PieChartIcon />} label="CategoryBreakdown" />
        </Tabs>
        {selectedComponent && <div>{selectedComponent}</div>}
        </Box>
        </Box>
    )
}

export default MainRenderer