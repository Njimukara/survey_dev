// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
// // Assets
// import Project1 from 'img/profile/Project1.png'
// import Project2 from 'img/profile/Project2.png'
// import Project3 from 'img/profile/Project3.png'
// Custom components
import Card from 'components/card/Card'
import Project from 'views/admin/profile/components/Project'
import { MdAdd } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Projects(props: { [x: string]: any }) {
  const { company, ...rest } = props
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset'
  )

  const [companyMembers, setCompanyMembers] = useState([])
  const router = useRouter()

  useEffect(() => {
    console.log('members', company?.members)
    setCompanyMembers(company?.members)
  }, [company])

  return (
    <Card mb={{ base: '0px', '2xl': '20px' }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='large'
        mt='10px'
        mb='4px'>
        Company Users
      </Text>
      <Flex flexDirection='column' alignItems='center' justifyContent='center'>
        <Flex justifyContent='space-between' alignItems='center' mb='20px'>
          <Text color={textColorSecondary} fontSize='md' me='26px'>
            Get a glimse of the different users in your company
          </Text>
          <Flex>
            <Button
              mr='10px'
              onClick={() => {
                router.push('/admin/company/users')
              }}>
              View all Users
            </Button>
            <Button>
              <Flex>
                <MdAdd />
              </Flex>
              Invite new user
            </Button>
          </Flex>
        </Flex>
        <Box w='100%'>
          <Project
            boxShadow={cardShadow}
            mb='20px'
            position='Owner'
            name={company?.owner}
          />
          {/* {companyMembers?.length != 0 &&
          companyMembers.map((member) => {
            <Project
              boxShadow={cardShadow}
              mb='20px'
              name={member.name}
              position={'member'}
            />
          })} */}
        </Box>
      </Flex>
    </Card>
  )
}
