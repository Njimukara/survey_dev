import type { NextPage } from 'next'

import { Container, Heading, Box } from '@chakra-ui/react'
import Hero from '../layouts/home/Hero';

const Home: NextPage = () => {
  return (
    <Box p={0}>
      <Hero />
    </Box>
  )
}

export default Home
