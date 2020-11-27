import React from 'react'

import {auth, setUserIntoFirestore} from '../../firebase/firebase.utilities'

import '../form-input/form-input.component'
import '../custom-button/custom-button.component'

import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'



class SignUp extends React.Component {
    constructor(){
        super()

        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:'',
        }
    }

    handleChange=(event)=>{
        // const value= event.target.value;
        // const name=event.target.name;
        const {name,value}=event.target;
        this.setState({[name]:value})
    }

    handleSubmit=async (event)=>{
        event.preventDefault();
        const {displayName, email, password, confirmPassword}= this.state
        
        if (password !== confirmPassword) {
            alert("passwords doesn't match")            
            return;
        }
        
        try {
            const {user} =await auth.createUserWithEmailAndPassword(email,password)
            await setUserIntoFirestore(user,{displayName})    
                
            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            })

        } catch (error) {
            console.log(error)
        }
        

    }

    render(){        
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I don't have and account</h2>
                <span>Signup for an account</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput onChange={this.handleChange} name='displayName' type='text' value={displayName} label='Enter Name' />
                    <FormInput onChange={this.handleChange} name='email' type='email' value={email} label='Enter email' />
                    <FormInput onChange={this.handleChange} name='password' type='password' value={password} label='Enter password' />
                    <FormInput onChange={this.handleChange}  name='confirmPassword' type='password' value={confirmPassword} label='Confirm Password' />
                    <CustomButton type="submit">Sign Up</CustomButton>
                    
                </form>
            </div>
        )
    }
}


export default SignUp;