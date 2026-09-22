import Login from "./Pages/Login";
import Tasks from "./Pages/Tasks";
import Register from "./Pages/Register";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/tasks" element={<Tasks />} />
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;