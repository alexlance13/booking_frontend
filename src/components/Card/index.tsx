import React from 'react';
import { Wrapper, InfoDiv, Header, ImageDiv } from './styles';

const Card: React.FC<PropsType> = ({ image, name, children }) => {
  return (
    <Wrapper>
      <ImageDiv>
        <img src={image} alt={name} width='300' height='200' />
      </ImageDiv>
      <InfoDiv>
        <Header>{name}</Header>
        <div>{children}</div>
      </InfoDiv>
    </Wrapper>
  );
};

export default Card;

interface PropsType {
  name: string;
  image: string;
  children: any;
}
