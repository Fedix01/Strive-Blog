import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import NotFound from './components/NotFound/NotFound';
import AlertProvider from './components/AlertProvider/AlertProvider';
import Backoffice from './components/Backoffice/Backoffice';
import SignIn from './components/SignIn/SignIn';
import UserProfile from './components/UserProfile/UserProfile';
function App() {
  return (
    <>
      <BrowserRouter>
        <AlertProvider>
          <Routes>

            <Route path='/' element={<Homepage />}></Route>
            <Route path='/signIn' element={<SignIn />}></Route>
            <Route path='/me' element={<UserProfile />}></Route>
            <Route path='/newPost' element={<Backoffice />}></Route>
            <Route path='/*' element={<NotFound />}></Route>

          </Routes>
        </AlertProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
