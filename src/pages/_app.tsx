"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React from "react";
import theme from "theme/theme";

import "styles/Fonts.css";
import "styles/App.css";
import "styles/Contact.css";

import "react-calendar/dist/Calendar.css";
import "styles/MiniCalendar.css";
import Head from "next/head";

import "../../styles/globals.css";
// import {theme} from '../theme/';
import "theme/styles.css";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { AuthGuard } from "layouts/auth/AuthGuard";
import { SubscriptionProvider } from "contexts/SubscriptionContext";
import { PlanContextProvider } from "contexts/PlanContext";
import { CurrentUserProvider } from "contexts/UserContext";
import { SurveyContextProvider } from "contexts/Survey";
import { Router } from "next/router";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

// add requireAuth to AppProps
type AppPropsWithAuth = AppProps<{ session?: Session }> & {
  Component: {
    requireAuth?: boolean;
  };
};

function MyApp({ Component, pageProps }: AppPropsWithAuth) {
  Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done();
  });

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Survey Planner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <SessionProvider
        session={pageProps.session}
        // Re-fetch session every 5 minutes
        refetchInterval={5 * 60}
        // Re-fetches session when window is focused
        refetchOnWindowFocus={true}
      >
        {Component.requireAuth ? (
          <AuthGuard>
            <SubscriptionProvider>
              <PlanContextProvider>
                <SurveyContextProvider>
                  <CurrentUserProvider>
                    <Component {...pageProps} />
                  </CurrentUserProvider>
                </SurveyContextProvider>
              </PlanContextProvider>
            </SubscriptionProvider>
          </AuthGuard>
        ) : (
          <PlanContextProvider>
            <Component {...pageProps} />
          </PlanContextProvider>
        )}
        {/* <Component {...pageProps} /> */}
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
