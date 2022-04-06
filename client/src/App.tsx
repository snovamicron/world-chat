

// context provider
import DataContextProvider from "./context/DataContext";

// components
import Main from "./components/Main";

function App() {
  return (
    <>
    <DataContextProvider>
    <Main/>
    </DataContextProvider>
    </>
  );
}

export default App;
