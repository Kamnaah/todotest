import './App.css';
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from './components/Register';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
