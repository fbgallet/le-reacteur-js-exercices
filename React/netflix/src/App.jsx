import "./App.css";
import movies from "./assets/movies_rnexgr.json";
import Section from "./components/Section";

function App() {
  return (
    <>
      <header>
        <img src="../public/img/netflix logo.png" alt="netflix" />
      </header>
      <main>
        {movies.map((elt, index) => {
          return (
            <Section title={elt.category} key={index} movies={elt.images} />
          );
        })}
      </main>
    </>
  );
}

export default App;
