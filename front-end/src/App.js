import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import AllAuthors from './components/AllAuthors/AllAuthors';
import AllBlogPosts from './components/AllBlogPosts/AllBlogPosts';
import NotFound from './components/NotFound/NotFound';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/authors' element={<AllAuthors />}></Route>
          <Route path='/blogPosts' element={<AllBlogPosts />}></Route>
          <Route path='/*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
