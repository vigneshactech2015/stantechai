import './App.css';
import MainRenderer from './components/MainRenderer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <MainRenderer />
    <ToastContainer/>
    </>
  );
}

export default App;
