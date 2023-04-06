import {
  Card,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

export default function CloudPoints(props: { [x: string]: any }) {
  const { ...rest } = props
  const textColorSecondary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.300'
  )

  return (
    <Card borderRadius='10px' p='4' boxShadow='lg' w='100%' {...rest}>
      <Text mb='4' fontWeight='bold' textTransform='uppercase'>
        Reduction of cloud points
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <Flex flexDirection='column'>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>Reduction of cloud points</FormLabel>
            <Select borderRadius='10px' fontSize='small'>
              <option value='option1'>GNSS</option>
              <option value='option2'>INS</option>
            </Select>
          </FormControl>
        </Flex>
      </SimpleGrid>
    </Card>
  )
}
