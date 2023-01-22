import React from 'react';

import { Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from '../App';
import { logout } from '../store/auth-actions';
import { useDispatch} from 'react-redux';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalQuantity = useSelector((store) => store.cart.totalQuantity);
  const {user} = useContext(MainContext)
  console.log(user)
  return (
    <nav className='grid grid-cols-2 p-4 border-b font-semibold h-18'>
      <h1 className='font-bold text-3xl uppercase flex items-center justify-start px-4 tracking-wider'>
        <button onClick={()=>navigate("/")}>Hein.</button>
      </h1>
      <div className='flex justify-end items-center px-4 text-md md:text-lg'>
       {user===null? <div>
         <Link to='/signup' className='uppercase px-4 py-2'>
            Register
          </Link>
          <Link to='/login' className='uppercase px-4 py-2'>
            Sign in
          </Link>
       </div>:
        <div className='flex gap-4'>
          <Link to='/cart'>
          <Badge
            badgeContent={totalQuantity}
            color='primary'
            className='cursor-pointer'
          >
            <ShoppingCart />
          </Badge>
        </Link>
        <button onClick={()=>{dispatch(logout()); navigate("/")}}>Logout</button>
        </div>}
        
      </div>
    </nav>
  );
};

export default Navbar;
