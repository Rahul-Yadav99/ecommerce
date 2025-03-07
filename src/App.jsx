import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import AdminProducts from './components/Admin/Products';
import Orders from './components/Admin/Orders';
import Dashboard from './components/Admin/Dashboard';
import Payments from './components/Admin/Payments';
import Customers from './components/Admin/Customers';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import PreGuard from './components/Guard/PreGuard';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Failed from './components/Failed';
import AdminGuard from './components/Guard/AdminGuard';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home slider brandName feature />} />
          <Route path='/products' element={<Home slider={false} brandName={false} feature={false} title='All Products'/>} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />}/>

          <Route element={<PreGuard />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>

          <Route element={<AdminGuard />}>
            <Route path='/admin'>
                <Route path='products' element={<AdminProducts />} />
                <Route path='orders' element={<Orders />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='customers' element={<Customers />} />
                <Route path='payments' element={<Payments />} />
            </Route>
          </Route>

          <Route path='/failed' element={<Failed />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}
export default App;