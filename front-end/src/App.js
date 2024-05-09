import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import NotFound from './components/NotFound/NotFound';
import AlertProvider from './components/AlertProvider/AlertProvider';
import Backoffice from './components/Backoffice/Backoffice';
import SignIn from './components/SignIn/SignIn';
import UserProfile from './components/UserProfile/UserProfile';
import SignUp from './components/SignUp/SignUp';
import BlogDetails from './components/BlogDetails/BlogDetails';
import SearchBarProvider from './components/SearchBarProvider/SearchBarProvider';
import AllAuthors from './components/AllAuthors/AllAuthors';
import GoogleUserProvider from './components/GoogleUserProvider/GoogleUserProvider';
function App() {
  return (
    <>
      <BrowserRouter>
        <AlertProvider>
          <SearchBarProvider>
            <GoogleUserProvider>
              <Routes>

                <Route path='/' element={<Homepage />}></Route>
                <Route path='/blogDetails/:id' element={<BlogDetails />}></Route>
                <Route path='/signIn' element={<SignIn />}></Route>
                <Route path='/signUp' element={<SignUp />}></Route>
                <Route path='/me' element={<UserProfile />}></Route>
                <Route path='/authors' element={<AllAuthors />}></Route>
                <Route path='/newPost' element={<Backoffice />}></Route>
                <Route path='/*' element={<NotFound />}></Route>

              </Routes>
            </GoogleUserProvider>
          </SearchBarProvider>
        </AlertProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
