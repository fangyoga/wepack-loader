import React from 'react';
import img from '@/assets/img.png';
import PageTwo from '../page-two';

export interface IProps {

}

const Index: React.FC<IProps> = (props) => (
  <div>
    <p>titleOne</p>
    <img src={img} alt="" />
    <PageTwo />
  </div>
);

export default Index;
