import React, { Fragment } from "react";
import Router from "next/router";


// types
import type { AppProps } from "next/app";

// global styles
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/styles.scss";

import * as gtag from "./../utils/gtag";
import { ApolloProvider } from "@apollo/client";
import { client } from "../libs/apolloClient";

const isProduction = process.env.NODE_ENV === "production";

// only events on production
if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on("routeChangeComplete", (url: string) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  </ApolloProvider>
);

export default MyApp;
