import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Todo from "./page/Todo";
import Requireauth from "./component/Requireauth";
import PersistLogin from "./component/PersistLogin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<Requireauth />}>
              <Route path="/todo" element={<Todo />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
