import React from 'react';
import img from '@/assets/img.png';

export interface IProps {

}

const Index: React.FC<IProps> = (props) => (
  <div>
    <p>titleOne</p>
    <img src={img} alt="" />
  </div>
);

export default Index;
