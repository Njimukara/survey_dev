import React from 'react'
import { Box, Button, Center, Heading, VStack, Text } from '@chakra-ui/react'
const Hero = () => {
  return (
    <Center
      as='header'
      bgImg='linear-gradient(to right bottom, rgba(57, 101, 255, 0.90), rgba(115, 83, 255, 0.9)), url("/background-hero-3.jpg")'
      backgroundSize='cover'
      backgroundPosition='bottom'
      h='100vh'
      w='100vw'>
      <VStack w='60rem' textAlign='center' mt='8rem' spacing='9'>
        <Heading
          as='h1'
          fontSize='64px'
          color='white'
          letterSpacing='2px'
          mb='2'>
          The Fastest solution to generate hydrographic surveys
        </Heading>

        <Text w='40rem' fontSize='28px' color='white' lineHeight='9'>
          Much more than just a software, we provide an easy made solution for
          you to generate your surveys
        </Text>

        <Button variant='homeWhite'>Buy a licence</Button>
      </VStack>
    </Center>
  )
}

export default Hero
