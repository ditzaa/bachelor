import "./Pages/Home.css";
import LoginForm from "./Pages/LoginForm";
import Register from "./Pages/Register";
import Main from "./Pages/Main";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<HomePg />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<Main />}></Route>
    </>
  )
);

import HomePg from "./Pages/HomePg";
function App() {
  return <RouterProvider router={router} />;
}

export default App;
