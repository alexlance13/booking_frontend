import React from 'react';
import { Wrapper, InfoDiv, Header, ImageDiv, OrderDiv } from './styles';

const SingleOffer: React.FC<PropsType> = ({ name, image, description, price, children }) => {
  return (
    <Wrapper>
      <Header>{name}</Header>
      <ImageDiv>
        <img src={image} alt={name} />
      </ImageDiv>
      <InfoDiv>
        <div>
          <p>{description}</p>
        </div>
        <OrderDiv>
          <div>
            <span>Price: </span>
            {price}$
          </div>
          {children}
        </OrderDiv>
      </InfoDiv>
    </Wrapper>
  );
};

export default SingleOffer;

interface PropsType {
  name: string;
  image: string;
  description: string;
  price: number;
  children: any;
}
