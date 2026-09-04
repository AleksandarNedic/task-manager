import Login from "./Components/Login";
import Tasks from "./Components/Tasks";
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
