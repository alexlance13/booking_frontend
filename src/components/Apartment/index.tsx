import React from "react";
import { Wrapper, InfoDiv, Header, ImageDiv } from "./styles";

const Apartment: React.FC<PropsType> = ({ apartment }) => {
  return (
    <Wrapper>
      <ImageDiv>
        <img src={apartment.image} alt={apartment.name} width='300' height='200' />
      </ImageDiv>
      <InfoDiv>
        <Header>{apartment.name}</Header>
        <p>{apartment.description}</p>
      </InfoDiv>
    </Wrapper>
  );
};

export default Apartment;

interface PropsType {
  apartment: {
    __typename: string,
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    roomsCount: number;
    seller: any;
    bookings: any[];
  };
}
