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

export default function PerformanceInsCard(props: { [x: string]: any }) {
  const { ...rest } = props
  const textColorSecondary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.300'
  )

  return (
    <Card borderRadius='10px' p='4' boxShadow='lg' w='100%' {...rest}>
      <Text mb='4' fontWeight='bold' textTransform='uppercase'>
        Performance INS/GNSS
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <Flex flexDirection='column'>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>Yaw uncertainty (*)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='0.01'
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>Roll uncertainty (*)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='0.01'
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>Pitch uncertainty (*)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='0.01'
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>
              Positioning uncertainty in H (m)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='0.02'
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>
              Positioning uncertainty in V (m)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='0.04'
            />
          </FormControl>
        </Flex>
        <Flex flexDirection='column'>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>Heavy uncertainty (*)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='6'
            />
          </FormControl>
        </Flex>
      </SimpleGrid>
    </Card>
  )
}
