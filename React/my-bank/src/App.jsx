import "./App.css";
import Accounts from "./components/Accounts";
import Header from "./components/Header";

const accountsContent = [
  {
    name: "Courant",
    balance: 1205.67,
    color: "#1976D2",
    operations: [
      {
        date: "20/07/2019",
        description: "SPOTIFY",
        amount: -9.99,
      },
      {
        date: "18/07/2019",
        description: "CARREFOUR MARKET",
        amount: -23.56,
      },
      {
        date: "18/07/2019",
        description: "DAB",
        amount: -50.0,
      },
      {
        date: "16/07/2019",
        description: "SALAIRE",
        amount: 2183,
      },
    ],
  },
  {
    name: "Livret A",
    balance: 6300,
    color: "#C2185B",
    operations: [
      {
        date: "15/07/2019",
        description: "MACBOOK",
        amount: -3500,
      },
      {
        date: "01/07/2019",
        description: "EPARGNE",
        amount: 500,
      },
      {
        date: "01/06/2019",
        description: "EPARGNE",
        amount: 500,
      },
      {
        date: "01/05/2019",
        description: "EPARGNE",
        amount: 1000,
      },
    ],
  },
];

function App() {
  return (
    <>
      <Header userName="Etienne" />
      <Accounts accounts={accountsContent} />
    </>
  );
}

export default App;
