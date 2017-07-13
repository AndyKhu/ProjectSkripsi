import React , {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component{
  renderLinks(){
    if(this.props.authenticated){
      return <li className="nav-item">
        <Link className="nav-link" to="/signout">Sign Out</Link>
      </li>
    }else{
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>
      ];
    }
  }
  render(){
    return (
      <nav className="navbar navbar-light navbar-fixed-top custom-navbar">
        <div className="col-xs-3 col-md-2">
          <Link to="/" className="navbar-brand">Rabbito</Link>
        </div>
        <div className="col-xs-15 col-md-10">
          <div className="fright">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feature">Feature</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faq">FAQ</Link>
              </li>
              {this.renderLinks()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state){
  return{
    authenticated: state.auth.authenticated
  };
}
export default connect(mapStateToProps)(Header);
