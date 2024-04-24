import './App.css';
import Home from './routes/Home/Home.component.jsx'
import { Routes,Route} from 'react-router-dom';

function App() {
  return (
    <Routes>
    <Route index element={<Home/>}/>
    </Routes>
  );
}

export default App;
