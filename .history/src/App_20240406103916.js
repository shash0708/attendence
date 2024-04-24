import './App.css';
import Home from './routes/Home/Home.component.jsx'
import { Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Route index element={<Home/>}/>

    </div>
  );
}

export default App;
