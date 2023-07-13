import { Card, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const NoData = (props: { [x: string]: any }) => {
  const { title, ...rest } = props;
  return (
    <Card w="100%" borderRadius={10} {...rest}>
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
