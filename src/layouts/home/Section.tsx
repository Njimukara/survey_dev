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
        px={{ base: "2%", md: "3%", lg: "0%" }}
        py={{ base: "30px", md: "40px", lg: "50px" }}
      >
        <Heading
          // size={{ base: "lg", md: "xl", lg: "xl" }}
          as="h2"
          mb={{ base: "30px", md: "50px", lg: "80px" }}
          textAlign="center"
          w={{ base: "100%", lg: "75%" }}
          fontWeight="600"
          fontSize="32px"
          textTransform="capitalize"
        >
          {title}
        </Heading>
        {children}
      </Container>
    </Box>
  );
};

export default Section;
