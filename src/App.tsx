import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";

import { useSelector } from 'react-redux';
import { productIdSelector, productSelector } from './store/product.slice';

import Auth from './pages/auth';
import Browse from './pages/browse';
import Profile from './pages/profile';
import Orders from './pages/orders';
import Cart from './pages/cart';
import Product from './components/product';

import PageContainer from './components/pageContainer';
import PrivateRoute from './components/privateRoute';
import ThemeContext, {themes} from './hooks/themeContext';

import { Provider } from 'react-redux';
import store from './store';
import MenuContainer from './components/menuContainer';
import ContentContainer from './components/contentContainer';
import Divider from './components/divider';
import FilterContainer from './components/filterContainer';
import { API_URL } from './utils/constants';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'> ('light');
  const theme = currentTheme === 'light' ? themes.light : themes.dark; 
  const { params } = useParams();
  //const productId = useSelector(productIdSelector);


  return (
    <ThemeContext.Provider value={theme}>
      <Provider store={store}>
        {/* <button onClick={() => setCurrentTheme('dark')}>dark</button>
        <button onClick={() => setCurrentTheme('light')}>light</button> */}
        <Router>
          <Routes>
            <Route path="/profile" element={
              <PrivateRoute>
                <PageContainer>
                  <MenuContainer />
                  <ContentContainer>
                    <Profile />
                  </ContentContainer>
                </PageContainer>
              </PrivateRoute>}
            />
            <Route path="/login" element={
              <PageContainer>
                <MenuContainer />
                <ContentContainer>
                  <Auth />
                </ContentContainer>  
              </PageContainer>}
            />
            <Route path="/" element={
              <PageContainer>
                <MenuContainer />
                <ContentContainer>
                  <Browse />
                </ContentContainer>
                <FilterContainer/>
              </PageContainer>}
            />
            <Route path="/orders" element={
              <PrivateRoute>
                <PageContainer>
                  <MenuContainer />
                  <ContentContainer>
                    <Orders />
                  </ContentContainer>
                </PageContainer>
              </PrivateRoute>
            }
            />
            <Route path="/cart" element={
              <PrivateRoute>
                <PageContainer>
                  <MenuContainer />
                  <ContentContainer>
                    <Cart />
                  </ContentContainer>
                </PageContainer>
              </PrivateRoute>
            }
            />
          </Routes>
        </Router>
      </Provider>
    </ThemeContext.Provider>
  );
}


