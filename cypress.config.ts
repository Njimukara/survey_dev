import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    // baseUrl: "https://hydro-survey-mx5fg65bz-ndambaplay-gmailcom.vercel.app/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  // component: {
  //   devServer: {
  //     framework: "next",
  //     bundler: "webpack",
  //   },
  // },
});
