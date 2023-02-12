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
import { MdUpload, MdOutlineMail, MdOutlineArrowBack } from 'react-icons/md'

// import { useRef } from 'react'
import { getProviders, getSession, signIn } from 'next-auth/react'
import axios from 'axios'

export default function verifyEmail({ providers }: any) {
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
  const [resend, setResend] = React.useState(false)

  const toggleResend = () => {
    setResend(!resend)
  }
  const onSubmit = async (values: any, actions: any) => {
    console.log(values)

    const res = await axios
      .post(
        `https://surveyplanner.pythonanywhere.com/auth/users/resend_activation/`,
        values
      )
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is Invalid').required('Required'),
  })
  const {
    values,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit,
  })

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
        {resend ? (
          <Flex flexDirection='column' alignItems='center'>
            <Text>Your almost there!</Text>
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
            <Button onClick={toggleResend} my={4}>
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
        ) : (
          <Flex mb='100px' alignItems='center'>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Input the email you used to register</FormLabel>
                <Input
                  id='email'
                  name='email'
                  variant='rounded'
                  fontSize='md'
                  ms={{ base: '0px', md: '0px' }}
                  type='text'
                  placeholder='Email *'
                  mr='2px'
                  fontWeight='500'
                  size='lg'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <FormHelperText color='red.400' mt='0' mb='5px'>
                    {errors.email}
                  </FormHelperText>
                ) : (
                  ''
                )}
              </FormControl>
              <Flex mt={6} w='100%'>
                {!isSubmitting ? (
                  <Button type='submit' w='100%' variant='homePrimary'>
                    Resend Link
                  </Button>
                ) : (
                  <Flex w='100%' alignItems='100%' justifyContent='center'>
                    <Spinner thickness='4px' speed='0.9s' color='primary.500' />
                  </Flex>
                )}
              </Flex>
              <Flex justifyContent='center'>
                <Button mt={8} onClick={toggleResend}>
                  <Icon mr={1} as={MdOutlineArrowBack} boxSize={8} />
                  <Text>Cancel</Text>
                </Button>
              </Flex>
            </form>
          </Flex>
        )}
      </Flex>
    </DefaultAuthLayout>
  )
}
