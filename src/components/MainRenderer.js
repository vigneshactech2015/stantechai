import {useState} from "react";
import AddTransaction from "./AddTransaction";
import CategoryBreakdown from "./CategoryBreakdown";
import Summary from "./Summary";
import TransactionList from "./TransactionList";

const MainRenderer = () => {
    const [selectedComponent,setSelectedComponent] = useState(<TransactionList/>)

    const sections = {
        "Add Transaction" : <AddTransaction/>,
        "Summary" : <Summary/>,
        "TransactionList":<TransactionList/>,
        "CategoryBreakdown":<CategoryBreakdown/>
    }

    const sectionSelectionHandler = (section) => {
         setSelectedComponent(sections[section])
    }

    return (
        <div>
        <h1>Personal Finance Tracker</h1>
        <div style={{display:"flex",gap:"5%"}}>
        {Object.keys(sections)?.map((section)=>{
            return <p key={section} onClick={()=>sectionSelectionHandler(section)}>{section}</p>
        })}
        </div>
        {selectedComponent && <div>{selectedComponent}</div>}
        </div>
    )
}

export default MainRenderer