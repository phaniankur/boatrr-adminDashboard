import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
