import React , {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Template extends Component{
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
      <nav>
        
      </nav>
    );
  }
}

function mapStateToProps(state){
  return{
    authenticated: state.auth.authenticated
  };
}
export default connect(mapStateToProps)(Template);