import React from 'react';
import { Wrapper, InfoDiv, Header, ImageDiv } from './styles';

const Card: React.FC<PropsType> = ({ image, name, children, isOffer }) => {
  return (
    <Wrapper>
      <ImageDiv>
        <img src={image} alt={name} />
      </ImageDiv>
      <InfoDiv>
        <Header>{name}</Header>
        <div className={isOffer ? 'description' : ''}>{children}</div>
      </InfoDiv>
    </Wrapper>
  );
};

export default Card;

interface PropsType {
  name: string;
  image: string;
  children: any;
  isOffer?: boolean;
}
