// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'

// Assets
import Project1 from 'img/profile/Project1.png'
import Project2 from 'img/profile/Project2.png'
import Project3 from 'img/profile/Project3.png'
import { MdAdd, MdArrowRight } from 'react-icons/md'

// Custom components
import Card from 'components/card/Card'
import User from './User'
import Link from 'next/link'

export default function Users(props: { [x: string]: any }) {
  const { ...rest } = props
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  )
  return (
    <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
      <Flex justifyContent='space-between' alignItems='center'>
        <Box>
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mt='10px'
            mb='4px'>
            My Users
          </Text>
          <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
            All current users in your company.
          </Text>
        </Box>
        <Flex>
          <Link href={`/admin/company/users`}>
            <Button color='primary.500'>
              All Users
              <MdArrowRight />
            </Button>
          </Link>
          <Button color='primary.500'>
            <MdAdd />
            Add User
          </Button>
        </Flex>
      </Flex>
      <User
        boxShadow={cardShadow}
        mb='20px'
        image={Project1}
        link='#'
        name='Kevin Hart'
        priveledge='Admin'
      />
      <User
        boxShadow={cardShadow}
        mb='20px'
        image={Project2}
        link='#'
        name='Jordan Smith'
        priveledge='Editor'
      />
      <User
        boxShadow={cardShadow}
        image={Project3}
        link='#'
        name='Brian Colby'
        priveledge='Surveyor'
      />
    </Card>
  )
}
