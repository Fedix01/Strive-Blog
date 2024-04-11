import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar/MyNavbar';
import AllAuthors from './components/AllAuthors/AllAuthors';
import ModifyAuthorsProvider from './components/ModifyAuthorsProvider/ModifyAuthorsProvider';
function App() {
  return (
    <>
      <ModifyAuthorsProvider>
        <MyNavbar />
        <AllAuthors />
      </ModifyAuthorsProvider>
    </>
  );
}

export default App;
