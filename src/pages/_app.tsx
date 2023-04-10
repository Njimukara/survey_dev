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

// add requireAuth to AppProps
type AppPropsWithAuth = AppProps<{ session?: Session }> & {
  Component: {
    requireAuth?: boolean;
  };
};

function MyApp({ Component, pageProps }: AppPropsWithAuth) {
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
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          <Component {...pageProps} />
        )}
        {/* <Component {...pageProps} /> */}
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
