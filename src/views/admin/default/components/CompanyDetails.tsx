// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios'
import Card from 'components/card/Card'
import Projects from 'views/admin/profile/components/Projects'

import { NextAvatar } from 'components/image/Avatar'
// import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RegisterCompany from './RegisterCompany'

export default function CompanyDetails(props: {
  company: object
  hasDetails: boolean
  [x: string]: any
}) {
  const { hasDetails, toggleHasDetails, company, ...rest } = props

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important'
  )

  // Constant variables
  // const { data: session, status } = useSession()

  // const date = new Date(date_joined).toLocaleDateString()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  // const [user, setUser] = useState<any>()

  const toggleModal = (state: boolean) => {
    setIsOpen(state)
  }

  const toggleDetails = (state: boolean) => {
    toggleHasDetails(state)
  }

  if (!hasDetails) {
    return (
      <Card mb={{ base: '0px', lg: '20px' }} {...rest}>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          py={15}>
          <Text py={4}>No Company associated with this account yet</Text>
          <Button
            onClick={() => {
              toggleModal(true)
            }}>
            {/* // onClick={toggleModal}> */}
            Register Company
          </Button>
        </Flex>
        <RegisterCompany
          opened={isOpen}
          toggleModal={toggleModal}
          toggleDetails={toggleDetails}
        />
      </Card>
    )
  }

  return (
    <Card mb={{ base: '0px', lg: '20px' }} {...rest}>
      <Flex>
        <Flex
          px={5}
          w='30%'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'>
            <Box>
              <NextAvatar
                mx='auto'
                src={company?.logo}
                h='87px'
                w='87px'
                border='4px solid'
                borderColor={borderColor}
              />
            </Box>
            <Text pb={4} fontWeight='bold' fontSize='23px' textAlign='center'>
              {company?.name}
            </Text>
            <Box>
              <Text color='gray.400' transform='capitalize'>
                {company?.country}
              </Text>
            </Box>
            <Box>
              <Text color='gray.400' transform='capitalize'>
                {company?.city}
              </Text>
            </Box>
            <Box>
              <Text color='gray.400' transform='capitalize'>
                {/* Admin: {company?.owner} */}
              </Text>
            </Box>
          </Flex>
          <Flex pb={4} align='center' justify='space-between'></Flex>

          <Button
            onClick={() => router.push('/auth/edit-user')}
            mb={2}
            // variant='homePrimary'
            bg='primary.500'
            color='white'>
            Edit info
          </Button>
          {/* <Button onClick={deleteAccount}>Delete Company</Button> */}
        </Flex>
        <Flex w='70%'>
          <Projects company={company} />
        </Flex>
      </Flex>
      {/* toggleModal={openModal} */}
    </Card>
  )
}
