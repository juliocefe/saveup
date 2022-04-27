import React, { Fragment } from "react";
import { Body } from "./styles";
import { Link } from "@reach/router";

import { LogoMini } from "./../LogoMini";

export const Dashboard = () => {
  return (
    <Fragment>
      <Body>
        <LogoMini className="animated bounceInDown"></LogoMini>
        <p className="animated fadeIn delay-1s slow welcome">
          Bienvenido a Save Up!
        </p>
        <p className="animated fadeIn delay-1s slow">
          La aplicación que te ayudará a ahorrar en las compras del super
        </p>
        <Link
          to="/search"
          className="mt-4 animated bounceInUp delay-3s fast btn btn-success"
        >
          Crea tu lista :)
        </Link>
      </Body>
    </Fragment>
  );
};
