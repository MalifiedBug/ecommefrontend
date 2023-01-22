import React from 'react';

import { useParams } from 'react-router-dom';

import Announcement from '../layout/Announcement';
import Footer from '../layout/Footer';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Title from '../components/Title';

const ShoppingCategorie = () => {
  const { category } = useParams();

  return (
    <>
      <Announcement />
      <Title>{`${category.charAt(0).toUpperCase()}${category.slice(1)}`}</Title>
      <Products category={category} />
      <Newsletter />
      <Footer />
    </>
  );
};

export default ShoppingCategorie;
