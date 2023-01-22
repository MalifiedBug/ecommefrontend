import React from 'react';

import Announcement from '../layout/Announcement';
import Footer from '../layout/Footer';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';


const Home = () => {
    return (
      <>
        <Announcement />
        <Carousel />
      <Categories />
      <Products />
      <Newsletter />     
        <Footer />
      </>
    );
  };
  
  export default Home;
  