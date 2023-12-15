import React from 'react'
import Header from "../Components/Header";
import Carousel from "../Components/Carousel";

export const HomePage = () => {
  return (
    <>
    <Header />
    <Carousel layout='row' title='Action & Drama Movies'/>
    <Carousel layout='row-reverse' title='Funniest Comedy Movies of 2018' />
    </>
  )
}
export default HomePage;
