import Login from "./Pages/Login";
import Tasks from "./Pages/Tasks";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Tasks/>
      <Login />
    </RecoilRoot>
  );
}

export default App;
