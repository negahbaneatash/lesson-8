import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, setUserIntoFirestore } from './firebase/firebase.utilities';



class App extends React.Component{
  constructor(){
    super()

    this.state = {
      'currentUser': null
    }
  }


  unsubscribe = null;
  componentDidMount(){
    this.unsubscribe= auth.onAuthStateChanged(async user=>{ 
      if (user) {       
        const myRefOfFirestore = await setUserIntoFirestore(user);
        myRefOfFirestore.onSnapshot(snapshot=>{
          this.setState({
            currentUser:{
              id:snapshot.uid,
              ...snapshot.data()
            }
          })
        }) 
      } else {
        this.setState({
          currentUser:user
        })
      }
    })        
  }
  
  componentWillUnmount(){
    // don't know when this trigger
    this.unsubscribe()
  }
  
  render(){
    console.log('from App render')
    console.log(this.state.currentUser)
    return (
      <div>
        <Header currentuser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
  
}

export default App;
