import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon,Grid, Image, Segment, Container } from 'semantic-ui-react';
import img2 from '../assets/image/5.jpg';

class Feature extends Component {
  render() {
    return (
      <div>
        <Container fluid className='white'>
          <div className='ma-center'>
            <Icon name='rocket' color='yellow' size='huge'/>
            <br/>
            <p className='title'>This is what I can do for you</p>
            <h3 className='separator'></h3>
            <Grid stackable columns={3} className='reset-segment-border fc-grey'>
              <Grid.Column>
                <Segment>
                  <Image src={img2} size='tiny' shape='circular' centered />
                  <h3>Fitur 1 </h3>
                  <p>this is fitur 1 cuma buat tes aj keren ga kira" ?</p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Image src={img2} size='tiny' shape='circular' centered />
                  <h3>Fitur 1 </h3>
                  <p>this is fitur 1 cuma buat tes aj keren ga kira" ?</p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Image src={img2} size='tiny' shape='circular' centered />
                  <h3>Fitur 1 </h3>
                  <p>this is fitur 1 cuma buat tes aj keren ga kira" ?</p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Image src={img2} size='tiny' shape='circular' centered />
                  <h3>Fitur 1 </h3>
                  <p>this is fitur 1 cuma buat tes aj keren ga kira" ?</p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Image src={img2} size='tiny' shape='circular' centered />
                  <h3>Fitur 1 </h3>
                  <p>this is fitur 1 cuma buat tes aj keren ga kira" ?</p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Image src={img2} size='tiny' shape='circular' centered />
                  <h3>Fitur 1 </h3>
                  <p>this is fitur 1 cuma buat tes aj keren ga kira" ?</p>
                </Segment>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </div>
    );
  }
}

export default connect(null)(Feature);
