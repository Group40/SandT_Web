import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import first from "../../Images/Slides/1.jpg";
import second from "../../Images/Slides/2.jpg";
import third from "../../Images/Slides/3.jpg";
const items = [
  {
    src: first,
    altText: '',
    caption: '',
    header: '',
    key: '1'
  },
  {
    src: second,
    altText: '',
    caption: '',
    header: '',
    key: '2'
  },
  {
    src: third,
    altText: '',
    caption: '',
    header: '',
    key: '3'
  }
];

const CarouselSlide = () => <UncontrolledCarousel items={items} />;

export default CarouselSlide;