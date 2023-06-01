// Chakra imports
// import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { Image } from "@chakra-ui/react";
import styles from "../../styles/Home.module.css";
// Assets
import { ReactNode } from "react";

function Spinner(props: any) {
  return (
    <div>
      <Image src="/ball.gif" alt="spinner icon" h={10} w={10} />
    </div>
  );
}

export default Spinner;
