import React from 'react';

import { Place, MailOutline, LocalPhone } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className='p-8 grid gap-x-16 gap-y-4 md:grid-cols-3'>
      <div>
        <h1 className='font-bold text-3xl uppercase mb-4 tracking-wider'>
          <a href='_#'>Hein.</a>
        </h1>
        <p className='text-justify'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
          recusandae nobis sunt aliquid tempore vitae sapiente ea voluptatibus
          ab repellat asperiores eius cum laboriosam facilis eos, maiores
          deleniti nemo consequuntur assumenda sed consectetur culpa voluptatum
          quisquam quibusdam? Saepe, soluta quibusdam.
        </p>
      </div>
      <div>
        <h2 className='font-bold text-2xl mb-4 tracking-wider'>Useful Links</h2>
        <div className='grid grid-cols-2'>
          <ul>
            <li>
              <a href='_#'>Home</a>
            </li>
            <li>
              <a href='_#'>Man Fashion</a>
            </li>
            <li>
              <a href='_#'>Accessories</a>
            </li>
            <li>
              <a href='_#'>Order Tracking</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href='_#'>Cart</a>
            </li>
            <li>
              <a href='_#'>My Account</a>
            </li>
            <li>
              <a href='_#'>Wishlist</a>
            </li>
            <li>
              <a href='_#'>Terms</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className='font-bold text-2xl mb-4 tracking-wider'>Contact</h2>
        <ul>
          <li>
            <Place className='mr-4' />
            <span>Bangalore, Karnataka.</span>
          </li>
          <li>
            <LocalPhone className='mr-4' />
            <span>+91-8888888888</span>
          </li>
          <li>
            <MailOutline className='mr-4' />
            <span>contact@hein.com</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
