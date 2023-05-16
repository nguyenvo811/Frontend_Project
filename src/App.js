import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './clientPage/layout/Layout';
import Home from './clientPage/pages/Home/Home';
import Cart from './clientPage/pages/Cart/Cart';
import ProductDetail from './clientPage/pages/Products/ProductDetail';
import slug from './resources/slug';
import LayoutAdmin from './adminPage/layout/LayoutAdmin';
import ProductPage from './adminPage/pages/Products/ProductPage';
import UserListPage from './adminPage/pages/Users/UserListPage';
import CategoryPage from './adminPage/pages/Categories/CategoryPage';
import AdminOrderPage from './adminPage/pages/Orders/AdminOrderPage';
import OrderPage from './clientPage/pages/Orders/OrderPage';
import { decodeJwt } from './api/apiServices';
import SearchResult from './clientPage/pages/SearchResult';
import Mobile from './clientPage/pages/Mobile';
import SmartWatch from './clientPage/pages/SmartWatch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<OrderPage />} />
            <Route path={slug.DETAIL} element={<ProductDetail />} />
            <Route path={slug.SEARCH} element={<SearchResult />} />
            <Route path={slug.MOBILE} element={<Mobile />} />
            <Route path={slug.WATCH} element={<SmartWatch />} />
          </Route>
          <Route element={decodeJwt()? decodeJwt().role === "Admin" ? <LayoutAdmin /> : <Navigate to={"/"} replace={true}/> : <Navigate to={"/"} replace={true}/>}>
            <Route index path='/products' element={<ProductPage />} />
            <Route index path='/user-list' element={<UserListPage />} />
            <Route index path='/categories' element={<CategoryPage />} />
            <Route index path='/orders-list' element={<AdminOrderPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
