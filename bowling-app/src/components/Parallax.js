import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Block from 'react-blocks';
import _ from 'lodash';
import { Icon } from 'react-fa';
import logo from '../logo.svg';
import '../App.css';
import Calendar from './Calendar';
import imageArr from '../static/parallaxArr';
import firstBack from '../static/images/IMG_0750.JPG';
import secondBack from '../static/images/IMG_0749.JPG';

const Image = styled.img`
  heigth: 100%;
  width: 100%;
  display: ${({ displayImage }) => !displayImage && 'none'};
`;

const ImageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const ImgBlock = styled.img`
  height: 100%;
  width: 100%;
`;


class Parallax extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      picsArray: imageArr,
      displayedImage: imageArr[0]
    })
  }

  componentDidMount() {
    window.addEventListener('mousewheel', this.handleWheel.bind(this));
  }

  componentWillUnmount() {

  }

  getScroll = () => {
    if (window.pageYOffset !== undefined) {
      return window.pageYOffset;
    }
    const d = document;
    const r = d.documentElement;
    const b = d.body;
    const sx = r.scrollLeft || b.scrollLeft || 0;
    const sy = r.scrollTop || b.scrollTop || 0;

    return sy;
  };

  handleWheel(event) {
    const currentImageIndex = this.state.picsArray.indexOf(this.state.displayedImage);
    const y = event.deltaY;
    
    console.log(event);
    console.log(y);
    console.log(this.getScroll());
    console.log('currentImageIndex', currentImageIndex)

    if((y < 0) && currentImageIndex !== 0) {
      console.log('going up: ', y)
      if(0 !== currentImageIndex && this.getScroll() === 0){
        event.preventDefault();
        this.setState({
          displayedImage: this.state.picsArray[currentImageIndex - 1]
        })
      }
    }

    if((y > 0) && currentImageIndex < this.state.picsArray.length - 1) {
      console.log('going down: ', y)
      if((this.state.picsArray.length - 1) !== currentImageIndex){
        event.preventDefault();
        this.setState({
          displayedImage: this.state.picsArray[currentImageIndex + 1],
        })
      }           
    }
    
  }

  render() {
    const { picsArray, displayedImage } = this.state;
    return (

      <div>
        <ImageWrapper>
          {
            picsArray.map((i, index) => {
              return <Image src={i} alt='image' displayImage={i === displayedImage}/>
            })
          }
        </ImageWrapper>
        <Block className='content1' layout justifyCenter >
          <h1>Welcome to Valois Bowling</h1>
        </Block>
        <ImgBlock src={secondBack} alt='backgroundImage' /> 
        <Block className='content2' layout vertical center>
          <h1>Great place for parties</h1>
          <div>
            Lorem ipsum dolor sit amet, pretium donec porta, neque non in pede sem asperiores nisl, nulla in dapibus turpis eu posuere. Urna vitae qui viverra ipsum wisi, sed donec libero. Nec posuere porta nunc faucibus. Turpis mauris donec ut malesuada orci posuere, aliquam aliquet duis fugiat orci. Nulla nec magna, eros sit suscipit posuere torquent nisl mauris, libero sed gravida mi, mauris nulla ligula a aliquet. Erat feugiat elit a magna orci. Luctus a vehicula aliquet id aliquet risus, nibh tellus amet nec nec vivamus, consectetuer sapien wisi nec massa eius, consequat at vestibulum nibh sed viverra.
          </div>
          <div>
            Lorem ipsum dolor sit amet, pretium donec porta, neque non in pede sem asperiores nisl, nulla in dapibus turpis eu posuere. Urna vitae qui viverra ipsum wisi, sed donec libero. Nec posuere porta nunc faucibus. Turpis mauris donec ut malesuada orci posuere, aliquam aliquet duis fugiat orci. Nulla nec magna, eros sit suscipit posuere torquent nisl mauris, libero sed gravida mi, mauris nulla ligula a aliquet. Erat feugiat elit a magna orci. Luctus a vehicula aliquet id aliquet risus, nibh tellus amet nec nec vivamus, consectetuer sapien wisi nec massa eius, consequat at vestibulum nibh sed viverra.
          </div>
          <div>
            Lorem ipsum dolor sit amet, pretium donec porta, neque non in pede sem asperiores nisl, nulla in dapibus turpis eu posuere. Urna vitae qui viverra ipsum wisi, sed donec libero. Nec posuere porta nunc faucibus. Turpis mauris donec ut malesuada orci posuere, aliquam aliquet duis fugiat orci. Nulla nec magna, eros sit suscipit posuere torquent nisl mauris, libero sed gravida mi, mauris nulla ligula a aliquet. Erat feugiat elit a magna orci. Luctus a vehicula aliquet id aliquet risus, nibh tellus amet nec nec vivamus, consectetuer sapien wisi nec massa eius, consequat at vestibulum nibh sed viverra.
          </div>
          <div className='hours'>
            <ul>

            </ul>
          </div>
        </Block>
        <Block className='socialTitle' layout justifyCenter>
          <h2>Get in contact with us for reservations</h2>
        </Block>
        <Block className='socialMed' layout horizontal justifyCenter>
          <div className='facebook'><a href='https://www.facebook.com/Valois-Bowling-130041553693801/' ><Icon name='facebook-square' size='3x'/></a></div>
          <div className='email'><a href='mailto:valoisBowling@gmail.com'><Icon name='envelope' size='3x'/></a></div>
        </Block>
        <ImgBlock src={firstBack} alt='backgroundImage' />
        <Block layout justifyCenter>
          <Calendar />
        </Block>
      </div>
    );
  }
}

export default Parallax;