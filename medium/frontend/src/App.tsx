import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signin from "./pages/Signin"
import  Signup  from "./pages/Signup"
import Blog from "./pages/Blog"


function App() {
  
  return (
      <>
          <Router>
              <Routes>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/blog/:id" element={<Blog />} />
              </Routes>
          </Router>
      
    </>
  )
}

export default App
