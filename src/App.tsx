import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useGlobalContext } from "./context/context";

const App: React.FC = () => {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
