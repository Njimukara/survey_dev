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

export default function OperationalConditionsCard(props: { [x: string]: any }) {
  const { ...rest } = props
  const textColorSecondary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.300'
  )

  return (
    <Card borderRadius='10px' p='4' boxShadow='lg' w='100%' {...rest}>
      <Text mb='4' fontWeight='bold' textTransform='uppercase'>
        Operational Conditions
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <Flex flexDirection='column'>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>Tide uncertainty (m)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='0.05'
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>Co-tidal uncertainty (m)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='0.05'
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>
              Flying height or distance (m)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='480'
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>
              Angle of incidence of a beam (*)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='30'
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>Overlap rate (%)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='50'
            />
          </FormControl>
        </Flex>
        <Flex flexDirection='column'>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>Width of the study area (km)</FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='3'
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel fontSize='small'>
              Lenght of the study area (km)
            </FormLabel>
            <Input
              color={textColorSecondary}
              borderRadius='10px'
              fontSize='small'
              type='number'
              placeholder='50'
            />
          </FormControl>
        </Flex>
      </SimpleGrid>
    </Card>
  )
}
