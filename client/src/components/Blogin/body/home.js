import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Grid } from 'semantic-ui-react'
import img1 from '../assets/image/4.jpg';
import img2 from '../assets/image/5.jpg';
import img3 from '../assets/image/6.jpg';

class Home extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Column className='reset-padding-i'>
            <Image src={img1} fluid />
          </Grid.Column>
        </Grid>
        <div className="clearfix margin-45"/>
        <Grid className='padding-lr-1-i grid-c'>
          <Grid.Column width={3}>
            <Image src={img2} fluid />
          </Grid.Column>
          <Grid.Column width={13}>
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                </Grid.Column>
        </Grid>
        <div className="clearfix margin-45"/>
        <Grid className='padding-lr-1-i grid-c'>
          <Grid.Column width={13}>
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                </Grid.Column>
          <Grid.Column width={3}>
            <Image src={img2} fluid />
          </Grid.Column>
        </Grid>
        <div className="clearfix margin-45"/>
        <Grid className='padding-lr-1-i grid-c'>
          <Grid.Column width={3}>
            <Image src={img2} fluid />
          </Grid.Column>
          <Grid.Column width={13}>
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
                   blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla blablabbla 
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default connect(null)(Home);
