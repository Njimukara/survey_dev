import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    // baseUrl: "https://hydro-survey-mx5fg65bz-ndambaplay-gmailcom.vercel.app/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    NEXTAUTH_URL: "http://127.0.0.1:3000",
    NEXTAUTH_SECRET: "useColorModeValueg:none},{bg:one",
    BASE_URL: "localhost://3000",
    NEXT_PUBLIC_API_URL: "https://surveyplanner.pythonanywhere.com",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
