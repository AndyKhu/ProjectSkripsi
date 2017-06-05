import React, {Component} from 'react';
import { reduxForm , Field} from 'redux-form';
import * as Actions from '../../../actions';
import { connect } from 'react-redux';
import { Container , Input ,Popup ,Icon,Modal} from 'semantic-ui-react';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if(!values.password){
    errors.password = 'Please enter a password'
  }
  if(!values.passwordconfirm){
    errors.passwordconfirm = 'Please enter a password Confirmation'
  }
  if(values.password && values.passwordconfirm){
    if(values.password !== values.passwordconfirm){
      errors.password = 'Password must match';
    }
  }
  return errors
}

const renderInput = ({ input, label, type, meta: { touched, error } }) =>(
  <div>
    <div className="form-custom">
      <div className="row margin-bot-10px">
      <label className="col-md-4 pad-10px f-cst-2">{label}</label>
      <Input {...input} placeholder={label} type={type} className="col-md-7"/>
        {touched && error &&
          <Popup
            trigger={<Icon name='remove circle' size="large" className="form-icon" color="red" />}
            content={error}
            inverted/>
        }
      </div>
    </div>
  </div>
)
class Signup extends Component{
  handleFormSubmit(formProps){
    this.props.signupUser(formProps);
  }
  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className='alert alert-danger red'>
            <strong>Oops! </strong>{this.props.errorMessage}
        </div>
      );
    }
  }
  render(){

    const { handleSubmit } = this.props;

    return(
      <div>
        <div className="green-content">
          <div className="ma-center form-cst signup">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  <Field name="username" component={renderInput} type="text" label="Username"/>
                  <Field name="email" component={renderInput} type="text" label="Email"/>
                  <Field name="password" component={renderInput} type="password" label="Password"/>
                  <Field name="passwordconfirm" component={renderInput} type="password" label="Confirm Password"/>
                  {this.renderAlert()}
                  <br/>
                  <br/>
                  <div className="row">
                    <div className="col-md-4"/>
                    <div className="col-md-4">
                      <button action="submit" className="btn btn-primary col-md-12">Sign Up</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3"/>
                    <div className="col-md-6 title f-cst">
                      Already Have Account ? <a href="/signin">Sign in here....</a>
                    </div>
                  </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}

const signupForm = reduxForm({form:'signup',validate})(Signup);
export default connect(mapStateToProps, Actions)(signupForm);
