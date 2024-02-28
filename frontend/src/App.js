// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="container-fluid">
      

        <Routes>
         
            <Route path='/' element={<>
            hiii
            </>} />
           

        </Routes>

      </div>

    </Router>
  );
}

export default App;
