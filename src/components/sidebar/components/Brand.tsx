// Chakra imports
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'

// Custom components
import { HorizonLogo } from 'components/icons/Icons'
import { HSeparator } from 'components/separator/Separator'

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white')

  return (
    <Flex alignItems='center' flexDirection='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <Box>
        <Text mb='30px' fontSize='larger' fontWeight='bold'>
          Survey Planner
        </Text>
      </Box>
      <HSeparator mb='20px' />
    </Flex>
  )
}

export default SidebarBrand
