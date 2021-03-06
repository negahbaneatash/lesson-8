import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

import {auth, myGoogleSignIn} from '../../firebase/firebase.utilities'

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {email, password} = this.state;
    try {
      await auth.signInWithEmailAndPassword(email,password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      alert(error.message)
    }
    
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    // console.log(`from signin render: ${this.state.email}`)
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Sign in </CustomButton>
            <CustomButton isGoogleButt onClick={myGoogleSignIn} > Google Sign in </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
