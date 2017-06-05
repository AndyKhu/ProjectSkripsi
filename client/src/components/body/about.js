import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container , Item } from 'semantic-ui-react';
import img2 from '../../assets/image/5.jpg';

class Feature extends Component {
  render() {
    return (
      <div>
        <Container fluid className="app white aboutcst">
          <Item.Group>
           <Item>
            <Item.Image size='small' src={img2} shape='circular'/>

            <Item.Content verticalAlign='middle'>
              <Item.Header>Middle Aligned</Item.Header>
            </Item.Content>
          </Item>
          <div className="border-bot"></div>
          <Item>
            <Item.Image size='small' src={img2} shape='circular'/>

            <Item.Content verticalAlign='middle'>
              <Item.Header>Middle Aligned</Item.Header>
            </Item.Content>
          </Item>
          </Item.Group>
        </Container>
      </div>
    );
  }
}

export default connect(null)(Feature);
