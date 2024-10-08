import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import Products from './components/Admin/Products';
import Orders from './components/Admin/Orders';
import Dashboard from './components/Admin/Dashboard';
import Settings from './components/Admin/Settings';
import Payments from './components/Admin/Payments';
import Customers from './components/Admin/Customers';
import NotFound from './components/NotFound';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
            <Route path='/admin'>
                <Route path='products' element={<Products />} />
                <Route path='orders' element={<Orders />} />
                <Route path='dashbaord' element={<Dashboard />} />
                <Route path='customers' element={<Customers />} />
                <Route path='payments' element={<Payments />} />
                <Route path='settings' element={<Settings />} />
            </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}
export default App;