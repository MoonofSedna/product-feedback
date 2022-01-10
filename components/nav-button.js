import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Offcanvas from "react-bootstrap/Offcanvas";
// components
import { Button } from "./button";
// icons
import hamburgerIcon from "../public/images/icon-hamburger.svg";
import closeIcon from "../public/images/icon-close.svg";

const Container = styled.div`
  display: none;
  > button {
    background: none;
    padding: 0;
  }
  > button:hover,
  button:focus,
  button:active {
    background: none;
  }
  @media (max-width: 767px) {
    display: flex;
    align-items: center;
  }
`;

export default function NavButton({ children }) {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <Button variant="primary" onClick={() => setShow((p) => !p)}>
        {show ? (
          <Image src={closeIcon} objectFit="contain" alt="nav-icon" />
        ) : (
          <Image src={hamburgerIcon} objectFit="contain" alt="nav-icon" />
        )}
      </Button>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}
