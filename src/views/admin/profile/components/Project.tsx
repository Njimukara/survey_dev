// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card'
import { Image } from 'components/image/Image'
// Assets
import { MdDelete } from 'react-icons/md'

export default function Project(props: {
  name: string
  position: string
  [x: string]: any
}) {
  const { name, position, ...rest } = props
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'gray.400'
  const brandColor = useColorModeValue('brand.500', 'white')
  const bg = useColorModeValue('white', 'navy.700')
  return (
    <Card bg={bg} {...rest} p='14px'>
      <Flex align='center' direction={{ base: 'column', md: 'row' }}>
        {/* <Image h='80px' w='80px' src={image} borderRadius='8px' me='20px' /> */}
        <Box mt={{ base: '10px', md: '0' }}>
          <Text
            color={textColorPrimary}
            fontWeight='500'
            fontSize='md'
            mb='4px'>
            {name}
          </Text>
          <Text fontWeight='500' color={brandColor} fontSize='sm' me='4px'>
            {position}
          </Text>
        </Box>
        <Link
          href={'#'}
          variant='no-hover'
          me='16px'
          ms='auto'
          p='0px !important'>
          <Icon as={MdDelete} color='secondaryGray.500' h='18px' w='18px' />
        </Link>
      </Flex>
    </Card>
  )
}
