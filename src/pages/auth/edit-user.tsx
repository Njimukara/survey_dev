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
import { Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

// Custom components
import DefaultAuthLayout from 'layouts/auth/Default'
// Assets
import { MdOutlineMail, MdOutlineArrowBack } from 'react-icons/md'

import { useEffect } from 'react'
import axios from 'axios'

export default function EditUser(props: any) {
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
    <DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w='100%'
        mx={{ base: 'auto', lg: '0px' }}
        h='100vh'
        alignItems='center'
        justifyContent='center'
        mb={{ base: '30px', md: '130px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '20vh', md: '30vh' }}
        flexDirection='column'>
        <Flex flexDirection='column' alignItems='center'>
          <Text>You're almost there!</Text>
          <Icon
            my={4}
            p={2}
            borderRadius={'50%'}
            bg='green.100'
            as={MdOutlineMail}
            w={12}
            h={12}
            boxSize={12}
          />
          <Text>
            A link has ben sent to your email. Please click to activate your
            account
          </Text>
          <Button onClick={() => router.push('/auth/resend-email')} my={4}>
            Resend Link
          </Button>
          <Link href='/auth/signin'>
            <a href='/auth/signin'>
              <Flex alignItems='center'>
                <Icon mr={1} as={MdOutlineArrowBack} boxSize={8} />
                <Text>Back to Login</Text>
              </Flex>
            </a>
          </Link>
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  )
}
