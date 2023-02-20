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

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Formik, Form, useFormik } from 'formik'
import * as Yup from 'yup'

// Custom components
import { HSeparator } from 'components/separator/Separator'
import DefaultAuthLayout from 'layouts/auth/Default'
// Assets
import {
  MdUpload,
  MdClear,
  MdCheck,
  MdOutlineMail,
  MdOutlineArrowBack,
} from 'react-icons/md'

import { useEffect } from 'react'
import { getProviders, getSession, signIn } from 'next-auth/react'
import axios from 'axios'

export default function SuccesVerifyEmail({ providers }: any) {
  // Chakra color mode
  const btnbgColor = useColorModeValue('primary.500', 'white')
  const btnHover = useColorModeValue({ color: 'white' }, { color: 'white' })
  const textColor = useColorModeValue('navy.700', 'white')
  const brandColor = useColorModeValue('primary.500', 'white')
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
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [responseData, setResponseData] = useState('')

  const display = async () => {
    setLoading(true)
    let url: array = router.query.slug
    let uid, token
    for (let i in url) {
      uid = url[1]
      token = url[2]
    }
    console.log(uid, token)
    const data = {
      uid: uid,
      token: token,
    }
    let respond
    if (uid != undefined || token != undefined) {
      await axios
        .post(
          'https://surveyplanner.pythonanywhere.com/auth/users/activation/',
          data
        )
        .then((res) => {
          respond = res
          console.log(res)
          setLoading(false)
          setError('')
        })
        .catch((err) => {
          setError(err.response.data.detail)
          setLoading(false)
        })
    }
    // setError('There is an error with the verification email')
  }

  useEffect(() => {
    setLoading(true)
    display()
  }, [router.query.slug])

  if (isLoading) {
    return (
      <Box h='100vh' display='flex' justifyContent='center' alignItems='center'>
        <Box w='50%' h='60%' bg='primary.200' borderRadius={10}>
          <Text
            p={4}
            fontWeight='bold'
            transform='capitalize'
            fontSize={20}
            color={textColor}
            align='right'>
            Survey Planner
          </Text>
          <Flex
            mt={40}
            flexDirection='column'
            alignItems='center'
            justifyContent='center'>
            <Text fontWeight='bold' fontSize='large'>
              Account Verificaton in progress ...
            </Text>
            <Flex
              mt='10px'
              w='100%'
              alignItems='center'
              justifyContent='center'>
              <Spinner
                size='xl'
                thickness='7px'
                speed='0.9s'
                color='primary.500'
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      //   bgGradient='linear(to-b, primary.500, primary.300)'
      h='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <Box w='50%' h='60%' bg='primary.200' borderRadius={10}>
        <Text
          p={4}
          fontWeight='bold'
          transform='capitalize'
          fontSize={20}
          color={textColor}
          align='right'>
          Survey Planner
        </Text>
        {error == '' ? (
          <Flex flexDirection='column' alignItems='center'>
            <Box my={5}>
              <Image
                boxSize='150px'
                objectFit='cover'
                src='/congratulations.gif'
                alt='visual tick gif'
              />
            </Box>
            <Flex flexDirection='column' alignItems='center'>
              <Text fontWeight='bold' fontSize='large'>
                Account Verified!
              </Text>
              <Text my={4}>You have successfully verified your account</Text>
              <Button
                variant='homePrimary'
                onClick={() => router.push('/auth/signin')}>
                Proceed to Login
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex flexDirection='column' alignItems='center'>
            <Flex
              my={8}
              bg='#cf8888'
              color='primary.200'
              borderRadius='50%'
              justifyContent='center'
              alignItems='center'>
              <Icon boxSize={20} as={MdClear} />
            </Flex>
            <Flex flexDirection='column' alignItems='center'>
              <Text fontWeight='bold' fontSize='large'>
                Account not Verified!
              </Text>
              <Text my={4}>{error}</Text>
              <Button
                variant='homePrimary'
                onClick={() => router.push('/auth/resend-email')}>
                Resend activation link
              </Button>
            </Flex>
          </Flex>
        )}
      </Box>
    </Box>
  )
}
