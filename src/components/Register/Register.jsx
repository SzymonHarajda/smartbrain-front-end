import React,{Component} from "react";


class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            name: ''
        }
    }
    onNameChange = (event)=>{
        this.setState({name: event.target.value})
    }

    onEmailChange = (event)=>{
        this.setState({email: event.target.value})
    }
    
    onPasswordChange=(event)=>{
        this.setState({password: event.target.value})
    }
    onSubmitSignIn = () => {
        fetch('https://thawing-lake-14451-a98e2227004a.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        }).then(res => res.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home')
            }
        })
    }
    render(){
        return(
            <div className="">
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
                    <main className="pa4 black-80">
                        <div className="measure"> {/*form*/}
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                                    <input type="text"  
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    id="username"
                                    name="username"
                                    onChange={this.onNameChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                    />
                                </div>
                            <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                    />
                            </div>
                            </fieldset>
                            <div className="">
                                <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign up" 
                                onClick={this.onSubmitSignIn}
                                />
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default Register;