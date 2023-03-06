/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

// Assets
import { MdLockOpen } from 'react-icons/md'

import { useEffect } from 'react'

export default function ResetPasswordStatus(props: any) {
  // var state = props
  // Chakra color mode
  const btnbgColor = useColorModeValue('primary.500', 'white')
  const btnHover = useColorModeValue({ color: 'white' }, { color: 'white' })
  const textColor = useColorModeValue('navy.700', 'white')
  const brandColor = useColorModeValue('brand.500', 'white')
  const textColorSecondary = 'gray.400'
  // const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600')
  const textColorBrand = useColorModeValue('brand.500', 'white')
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200')
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' }
  )
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' }
  )
  const router = useRouter()

  useEffect(() => {}, [])

  return (
    <>
      <Flex
        w='100%'
        h='100vh'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'>
        <Box w='30%'>
          <Flex justifyContent='center' alignItems='center'>
            <Flex
              h={14}
              w={14}
              borderRadius='50%'
              bg='primary.100'
              justifyContent='center'
              alignItems='center'>
              <Icon as={MdLockOpen} color='primary.500' boxSize={6} />
            </Flex>
          </Flex>
          <Heading textAlign='center'>Password Reset</Heading>
          <Text my={4} fontSize='md' textAlign='center'>
            Your password has been successfully changed
          </Text>

          <Button
            onClick={() => router.push('/auth/signin')}
            type='submit'
            variant='homePrimary'
            mx='auto'
            w='100%'
            my={4}>
            Continue
          </Button>
          {/* <Flex justifyContent='center' alignItems='center' my={4}>
            <Link href='/auth/signin'>
              <a href='/auth/signin'>
                <Flex alignItems='center'>
                  <Icon mr={1} as={MdOutlineArrowBack} boxSize={5} />
                  <Text>Back to Login</Text>
                </Flex>
              </a>
            </Link>
          </Flex> */}
        </Box>
      </Flex>
    </>
  )
}
