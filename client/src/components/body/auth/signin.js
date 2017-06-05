import React, { Component } from 'react';
import { reduxForm , Field } from  'redux-form';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import { Container , Input ,Popup ,Icon } from 'semantic-ui-react';

const renderInput = ({ input, label, type}) =>
  <div>
    <div className="row margin-bot-10px">
    <Input {...input} placeholder={label} type={type} className="col-md-12"/>
    </div>
  </div>

class Signin extends Component{
  handleFormSubmit({username,password}){
    this.props.signinUser({username,password});
  }
  renderAlert(){
    if(this.props.errorMessage){
      return (
          <div className="alert alert-danger">
            <strong>Oops!</strong> {this.props.errorMessage}
          </div>
      );
    }
  }
  render(){
    const { handleSubmit } = this.props;

    return (
      <div className="green-content">
        <div className="ma-center signin form-cst ">
          <div className="row signin-r">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field name="username" component={renderInput} type="text" label="Username"/>
              <Field name="password" component={renderInput} type="password" label="Password" />
              {this.renderAlert()}
              <div className="test">
              <button action="submit" className="btn btn-primary col-md-12">Login</button>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col-md-12 f-cst-2 pad-10px-50px">
                not register ? <a href="/signup">Create account...</a>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}

const signinForm = reduxForm({form:'signin'})(Signin);
export default connect(mapStateToProps, actions)(signinForm);
