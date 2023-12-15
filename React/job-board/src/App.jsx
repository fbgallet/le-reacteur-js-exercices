import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Jobs from "./components/Jobs";

function App() {
  return (
    <>
      <Header title={"The Job Board"} />
      <div className="main">
        <Jobs />
      </div>
      <Footer />
    </>
  );
}

export default App;
