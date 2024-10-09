import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';

import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import LoginAdd from './Components/Login/LoginAdd';
import LoginManager from './Components/Login/LoginManager'
import PageNotFound from './Components/PageNotFound/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="loginadd" element={<LoginAdd />} />
          <Route path="loginmanager" element={<LoginManager />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App