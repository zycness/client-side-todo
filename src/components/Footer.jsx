import React from "react";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <section id='footer'>
      <h5 className='footer_title'>Hecho por </h5>
      <a
        href='https://www.linkedin.com/in/kevinnahuelf/'
        target='_blank'
        rel='noopener noreferrer'
        className='footer_link'
      >
        Kevin Flores <BsLinkedin size={"1.3rem"} style={{ margin: "0 3px" }} />
      </a>
    </section>
  );
};

export default Footer;
