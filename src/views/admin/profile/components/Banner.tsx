// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios'
import Card from 'components/card/Card'
import { NextAvatar } from 'components/image/Avatar'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Banner(props: {
  avatar: string
  name: string
  email: string
  date_joined: number | string
  [x: string]: any
}) {
  const { avatar, name, email, date_joined, ...rest } = props

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important'
  )

  const date = new Date(date_joined).toLocaleDateString()
  const router = useRouter()

  // delete user acount
  const deleteAccount = async () => {
    await axios
      .delete(`https://surveyplanner.pythonanywhere.com/auth/users/me/`)
      .then(() => {
        signOut({ callbackUrl: 'http://localhost:3000' })
      })
      .catch(() => {
        console.log('error loggin out')
      })
  }

  return (
    <Card mb={{ base: '0px', lg: '20px' }} {...rest}>
      <Flex>
        <Flex align='center' justify='space-between' w='20%'>
          <NextAvatar
            mx='auto'
            src={avatar}
            h='87px'
            w='87px'
            // mt='-43px'
            border='4px solid'
            borderColor={borderColor}
          />
        </Flex>
        <Box h='100%' mx='10px' w='3px' bg='primary.500' />
        <Box w='80%' px={20}>
          <Text pb={4} fontWeight='bold' fontSize='large'>
            User Info
          </Text>
          <Flex w='100%' pb={4} align='center' justify='space-between'>
            <Box>
              <Text color='gray.400' transform='capitalize'>
                Name
              </Text>
              <Text>{name}</Text>
            </Box>
            <Box>
              <Text color='gray.400' transform='capitalize'>
                Email
              </Text>
              <Text>{email}</Text>
            </Box>
            <Box>
              <Text color='gray.400' transform='capitalize'>
                Joined Since
              </Text>
              <Text>{date}</Text>
            </Box>
          </Flex>

          <Button
            onClick={() => router.push('/auth/edit-user')}
            mr={2}
            bg='primary.500'
            color='white'>
            Edit info
          </Button>
          <Button onClick={deleteAccount}>Delete account</Button>
        </Box>
      </Flex>
    </Card>
  )
}
