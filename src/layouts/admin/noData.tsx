import { Card, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const NoData = (props: { [x: string]: any }) => {
  const { title, ...rest } = props;

  const font_family = "Poppins";
  return (
    <Card
      w="100%"
      borderRadius={10}
      border="1px solid"
      borderColor="rgba(0, 0, 0, 0.11)"
      fontFamily={font_family}
      {...rest}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        py={24}
      >
        <Image
          boxSize="50px"
          objectFit="cover"
          src="/folder.png"
          alt="empty folder icon"
        />
        <Text>{title}</Text>
      </Flex>
    </Card>
  );
};

export default NoData;
