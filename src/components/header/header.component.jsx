import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

import {auth} from '../../firebase/firebase.utilities'

//refactor this later to user ternary expression instead of a function for SignInOut

// class Header extends React.Component{
//   constructor(props){
//     super()

//     this.state={"currentuser":props.currentuser}  
//   }
  
  
  

  // SignInOut = ()=>{    
  //   if (this.state.currentuser) {
  //     console.log('here')
  //     return (<div className='option' >SIGN OUT</div>)
  //   }else{
  //     console.log('there')
  //     return (<Link to='/signin' className='option'>SIGN IN</Link>)
  //   }
  // }  

const Header=({currentuser})=>{
  console.log('from header')
  console.log(currentuser)
  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
        {
          currentuser ? <div className='option' onClick={()=>{auth.signOut()}} >SIGN OUT</div>
          :
          <Link to='/signin' className='option'>SIGN IN</Link>
        }
        
      </div>
    </div>
  );
}

// }  

export default Header;
