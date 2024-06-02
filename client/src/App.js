import './App.css';
import Home from './routes/Home/Home.component.jsx'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';      
import { Routes,Route} from 'react-router-dom';
import Authentication from './routes/Authentication/Authentication.component';
import Form from './components/Form/From.component.jsx';
import LinkPage from './components/Student/Student.component.jsx';
import StudentPage from './components/student-form/student-form.component.jsx'
import Attendence from './components/attendence/Attendence.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
function App() {
  return (
    <Routes>
    <Route index element={<Home/>}/>

    <Route path='auth' element={<Authentication/>}/>
    <Route path='form' element={<Form/>}/>
    <Route path='/:eventName' element={<LinkPage/>}/>
    <Route path=':eventName/student-form' element={<StudentPage/>}/>

    <Route path=':eventName/attendence' element={<Attendence/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>

    </Routes>
  );
}

export default App;
