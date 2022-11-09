import { Box, Heading, Container } from "@chakra-ui/react";
import React from "react";

type sectionProps = {
  children?: JSX.Element;
  title: string;
};
const Section = ({ title, children }: sectionProps) => {
  return (
    <Box>
      <Container maxW='container.xl' centerContent py="150px">
        <Heading as="h2" mb="100px" textAlign="center" w="75%">
          {title}
        </Heading>
        {children}
      </Container>
    </Box>
  );
};

export default Section;
