import './App.css';
import Home from './routes/Home/Home.component.jsx'
import { Routes,Route} from 'react-router-dom';
import Authentication from './routes/Authentication/authentication.component';

function App() {
  return (
    <Routes>
    <Route index element={<Home/>}/>
    </Routes>
  );
}

export default App;
