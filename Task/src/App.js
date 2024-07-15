import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Search from './components/Search';
import Details from './components/Details';
import Cart from './components/Cart';

import Search from './components/Search';

function App(){
    return(
      
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Search/>}></Route>
        <Route path='/Details' element={<Details/>}></Route>
        <Route path='/Cart' element={<Cart/>} ></Route>
    </Routes>
    </BrowserRouter>
    )
}

export default App;