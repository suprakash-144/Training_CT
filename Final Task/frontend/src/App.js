import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Requireauth from "./routes/RequireAuth";
import PersistLogin from "./routes/PersistLogin";
import Project from "./pages/Project";
import Taskslist from "./pages/Taskslist";
import Singleproject from "./pages/Singleproject";
import Team from "./pages/Team";
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
              <Route path="/team" element={<Team />} />
              <Route path="/project" element={<Project />} />
              <Route path="/tasks" element={<Taskslist />} />
              <Route path="/project/:id" element={<Singleproject />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
