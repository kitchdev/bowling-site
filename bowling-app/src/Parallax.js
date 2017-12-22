import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';
import image1 from './images/IMG_0817.JPG';
import image2 from './images/IMG_0818.JPG';
import image3 from './images/IMG_0819.JPG';
import image4 from './images/IMG_0820.JPG';
import image5 from './images/IMG_0821.JPG';

const Image = styled.img`
  height: 300px;
  width: 300px;
  display: ${({ displayImage }) => !displayImage && 'none'};
`;

const ImageWrapper = styled.div`
  height: 300px;
  width: 300px;
  background-color: red;
`;

const Block = styled.div`
  height: 300px;
  width: 300px;
  background-color: red;
`;


class Parallax extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      picsArray: [image1, image2, image3, image4, image5],
      displayedImage: image3
    })
  }

  handleWheel(y) {
    const currentImageIndex = this.state.picsArray.indexOf(this.state.displayedImage);
    window.scroll(0,0)

    if((y && y > 15) && currentImageIndex < this.state.picsArray.length - 1) {
      console.log('going up: ', y)
      
      this.setState({
        displayedImage: this.state.picsArray[currentImageIndex + 1]
      })
    }

    if((y < 0 && y < -15) && currentImageIndex !== 0) {
      console.log('going down: ', y)
      
      this.setState({
        displayedImage: this.state.picsArray[currentImageIndex - 1]
      })
    }
    
  }

  render() {
    const { picsArray, displayedImage } = this.state;
    return (

      <div>
        <ImageWrapper
          onWheel={(e) => this.handleWheel(e.deltaY)}
          onScroll={() => console.log('on scroll')}
        >
        {
          picsArray.map((i, index) => {
            return <Image src={i} alt='image' displayImage={i === displayedImage}/>
          })
        }
        </ImageWrapper>
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
      </div>
    );
  }
}

export default Parallax;