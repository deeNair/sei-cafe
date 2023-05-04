import React from 'react';
import {Link } from 'react-router-dom'; // instead of a tag coz react will not rerender, a tag will make browser rerender
import {logOut} from '../utilities/users-service';

function NavBar(props){
  const {user,setUser}=props;
  const handleLogOut=()=>{
    logOut();
    setUser(null);//clear state and remove token
  }
  return (
    <nav>
       <Link to='/orders'>Order History</Link>
       &nbsp;| &nbsp;
       <Link to='/orders/new'>New Order</Link>
        <span>Welcome , {user.name}</span>
        <Link  onClick={handleLogOut}>Logout</Link>
    </nav>
  )
}

export default NavBar;