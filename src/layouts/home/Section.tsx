import { Box, Heading, Container } from "@chakra-ui/react";
import React from "react";

type sectionProps = {
  children?: JSX.Element;
  title?: string;
  bg?: string;
};
const Section = ({ title, children, bg }: sectionProps) => {
  return (
    <Box bg={bg ? bg : ""}>
      <Container
        maxW="container.xl"
        centerContent
        px={{ base: "2%", md: "3%", lg: "4%" }}
        py={{ base: "40px", md: "50px", lg: "90px" }}
      >
        <Heading
          size={{ base: "lg", md: "xl", lg: "xl" }}
          as="h2"
          mb={{ base: "30px", md: "50px", lg: "100px" }}
          textAlign="center"
          w={{ base: "100%", lg: "75%" }}
        >
          {title}
        </Heading>
        {children}
      </Container>
    </Box>
  );
};

export default Section;
