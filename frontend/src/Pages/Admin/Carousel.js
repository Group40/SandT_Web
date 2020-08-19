import React from 'react';
import { UncontrolledCarousel, Carousel } from 'reactstrap';
import first from "../../Images/Slides/1.jpg";
import second from "../../Images/Slides/2.jpg";
import third from "../../Images/Slides/3.jpg";
const items = [
  {
    src: first,
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header',
    key: '1'
  },
  {
    src: second,
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src: third,
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  }
];

const CarouselSlide = () => <UncontrolledCarousel items={items} />;

export default CarouselSlide;