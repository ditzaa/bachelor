import "./Pages/Home.css";
import LoginForm from "./Pages/LoginForm";
import Register from "./Pages/Register";
import Main from "./Pages/Main";
import Dashboard from "./Pages/Dashboard";
import SearchPlayer from "./Pages/SearchPlayer";
import PlayerDetails from "./Pages/PlayerDetails";
import FriendComponent from "./Pages/FriendComponent";
import HomePg from "./Pages/HomePg";
import SearchClubs from "./Pages/SearchClubs";
import ClubDetails from "./Pages/ClubDetails";
import FavoritePlayersList from "./Pages/FavoritePlayersList";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<HomePg />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<Main />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/search/player" element={<SearchPlayer />}></Route>
      <Route path="/search/club" element={<SearchClubs />}></Route>
      <Route path="/club-details/:transfermarktId" element={<ClubDetails />} />
      <Route
        path="/player-details/:playerId/:transfermarktId"
        element={<PlayerDetails />}
      />
      <Route path="/friends/:userId" element={<FriendComponent />} />
      <Route path="/players-list" element={<FavoritePlayersList />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
