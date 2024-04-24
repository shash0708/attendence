import './App.css';
import Home from './routes/Home/Home.component.jsx'
import { Routes,Route} from 'react-router-dom';
import Authentication from './routes/Authentication/Authentication.component';

function App() {
  return (
    <Routes>
    <Route index element={<Home/>}/>

    <Route path='auth' element={<Authentication/>}/>
    <Route path
    </Routes>
  );
}

export default App;
