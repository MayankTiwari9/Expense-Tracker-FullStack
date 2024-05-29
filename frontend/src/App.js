import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SingInForm from "./Components/SignInForm/SingInForm";
import SignUpForm from "./Components/SignUpForm/SignUpForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/signin" element={<SingInForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
