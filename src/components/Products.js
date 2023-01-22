import React, { useEffect, useState } from 'react';

import { publicRequest } from '../request-methods';

import Product from './Product';

const Products = ({ category, filter }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    
    try {
      const url = category !=="" ? `/products/category/${category}` : '/products'; //For the Home Page
      const response = await publicRequest.get(url);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className='pb-8 mx-8'
      id='products'
    >     
      {products.length !== 0 ?
      <div className='flex flex-wrap justify-center gap-3'>
        {products.map((product) => (
          <Product key={product.id} image={product.image} id={product.id} />
        ))}
      </div>:
      <div className='text-xl font-bold'>Coming Soon...</div>}
    </div>
  );
};

export default Products;
