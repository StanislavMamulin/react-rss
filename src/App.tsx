import './App.css';
import '@csstools/normalize.css';
import { Header } from './components/Header/Header';
import { AppRouter } from './components/AppRouter';

function App() {
  return (
    <div className="App">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
