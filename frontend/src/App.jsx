import Home from "./Pages/Home";
import About from "./Components/Home/About";
import "./Pages/Home.css";
import Work from "./Components/Home/Work";
import Footer from "./Components/Home/Footer";
function App() {
  return (
    <>
      <div className="Home">
        <Home></Home>
        <About></About>
        <Work></Work>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
