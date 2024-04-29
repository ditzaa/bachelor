import "./Pages/Home.css";
import LoginForm from "./Pages/LoginForm";
import Register from "./Pages/Register";
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
    </>
  )
);

import HomePg from "./Pages/HomePg";
function App() {
  return <RouterProvider router={router} />;
}

export default App;
