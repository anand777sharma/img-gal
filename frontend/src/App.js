// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [auth] = useAuth();
  return (
    <Router>
      <div className="container-fluid">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

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
