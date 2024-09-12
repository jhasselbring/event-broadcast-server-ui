import './styles/App.scss';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { GlobalStateProvider } from './GlobalStateContext';

const App = () => (
  <GlobalStateProvider>
    <header><Header /></header>
    <main><Main /></main>
    <footer><Footer /></footer>
  </GlobalStateProvider>
)

export default App;
