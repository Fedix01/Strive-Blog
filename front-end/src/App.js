import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar/MyNavbar';
import AllAuthors from './components/AllAuthors/AllAuthors';
import MyFooter from './components/MyFooter/MyFooter';
function App() {
  return (
    <>
      <MyNavbar />
      <AllAuthors />
      <MyFooter />
    </>
  );
}

export default App;
