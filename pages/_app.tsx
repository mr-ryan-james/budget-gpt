/*!

=========================================================
* NextJS Material Kit v1.2.1 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import PageChange from "../components/PageChange/PageChange";

import "/styles/scss/nextjs-material-kit.scss?v=1.2.0";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

async function getInitialProps({ Component, router, ctx }) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const { name } = ctx.query;

  let nameToUse = name;
  if (!name) {
    nameToUse = ctx.req?.headers?.cookie?.split("=")[1] ?? "Bob";
  }

  ctx.res?.setHeader("Set-Cookie", `name=${nameToUse};`);

  return { pageProps, name: nameToUse };
}

const NameContext = React.createContext("nameContext");

function BudgetGPT(props) {
  // Destructure the props
  const { Component, pageProps, name } = props;

  const [initialName] = React.useState(name);

  console.log({ initialName });

  // Return the JSX
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>BudgetGPT</title>
      </Head>
      <NameContext.Provider value={initialName || "fuck you"}>
        <Component {...pageProps} />
      </NameContext.Provider>
    </React.Fragment>
  );
}

export { NameContext };

BudgetGPT.getInitialProps = getInitialProps;
export default BudgetGPT;
