"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
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
// import { SubscriptionProvider } from "contexts/SubscriptionContext";
import { PlanContextProvider } from "contexts/PlanContext";
import { CurrentUserProvider } from "contexts/UserContext";
import { Router } from "next/router";
import NProgress from "nprogress";
// import { AllSurveysProvider } from "contexts/SurveyContext";
// import { SurveyHistoryProvider } from "contexts/SurveyHistoryContext";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
NProgress.configure({ showSpinner: false });

// add requireAuth to AppProps
type AppPropsWithAuth = AppProps<{ session?: Session }> & {
  Component: {
    requireAuth?: boolean;
  };
};

function MyApp({ Component, pageProps }: AppPropsWithAuth) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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
      </Head>
      <SessionProvider
        session={pageProps.session}
        // Re-fetch session every 5 minutes
        refetchInterval={5 * 60}
        // Re-fetches session when window is focused
        refetchOnWindowFocus={true}
      >
        {Component.requireAuth ? (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AuthGuard>
                {/* <SubscriptionProvider> */}
                {/* <SurveyHistoryProvider> */}
                <PlanContextProvider>
                  {/* <AllSurveysProvider> */}
                  <CurrentUserProvider>
                    <Component {...pageProps} />
                  </CurrentUserProvider>
                  {/* </AllSurveysProvider> */}
                </PlanContextProvider>
                {/* </SurveyHistoryProvider> */}
                {/* </SubscriptionProvider> */}
              </AuthGuard>
            </PersistGate>
          </Provider>
        ) : (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {/* <AllSurveysProvider> */}
              <PlanContextProvider>
                <Component {...pageProps} />
              </PlanContextProvider>
              {/* </AllSurveysProvider> */}
            </PersistGate>
          </Provider>
        )}
        {/* <Component {...pageProps} /> */}
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
