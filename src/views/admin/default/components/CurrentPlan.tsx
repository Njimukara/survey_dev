// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
// Custom components
import Card from 'components/card/Card'
import LineChart from 'components/charts/LineChart'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { MdBarChart, MdOutlineCalendarToday } from 'react-icons/md'
// Assets
import { RiArrowUpSFill } from 'react-icons/ri'
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from 'variables/charts'

export default function CurrentPlan(props: { [x: string]: any }) {
  const { ...rest } = props

  // Chakra Color Mode

  const textColor = useColorModeValue('navy.500', 'white')
  const whiteText = useColorModeValue('white', 'white')
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')
  const textColordark = useColorModeValue('black', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
  const iconColor = useColorModeValue('brand.500', 'white')
  const bgButton = useColorModeValue('primary.500', 'blue.300')
  const bgHover = useColorModeValue(
    { bg: 'primary.600' },
    { bg: 'whiteAlpha.50' }
  )
  const bgFocus = useColorModeValue(
    { bg: 'primary.600' },
    { bg: 'whiteAlpha.100' }
  )

  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(true)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true)
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Card
      justifyContent='center'
      flexDirection='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px' w='100%'>
        <Flex align='center' w='100%'>
          <Text color={textColorSecondary}>Current Plan</Text>
        </Flex>
      </Flex>
      {isActive ? (
        <Box>
          <Flex
            w='100%'
            justify='space-between'
            flexDirection={{ base: 'column', lg: 'row' }}>
            <Flex align='left' fontWeight='bold' flexDirection='column'>
              <Text fontSize='larger'>Single Product Monthly</Text>
              <Text
                bg={boxBg}
                px='2'
                my='2'
                py='1'
                w='max-content'
                borderRadius='10px'>
                $40/Month
              </Text>
            </Flex>
            <Flex align='center' flexDirection='column'>
              <Button
                mb='15px'
                fontSize='small'
                color={whiteText}
                bg={bgButton}
                _hover={bgHover}
                _focus={bgFocus}
                _active={bgFocus}>
                Upgrade Plan
              </Button>
              <Button fontSize='small' color={textColor} bg={boxBg}>
                Cancel
              </Button>
            </Flex>
          </Flex>

          <Flex align='left' flexDirection='column' color={textColorSecondary}>
            <Text>Status</Text>
            <Text
              color={active ? 'green' : 'red'}
              fontSize='large'
              fontWeight='bold'>
              Active
            </Text>
            <Text>Payment Method</Text>
            <Text fontSize='large' fontWeight='bold' color={textColordark}>
              Stripe
            </Text>
            <Text>
              Licence bought on{' '}
              <span style={{ color: textColordark, fontWeight: 'semi-bold' }}>
                September 9, 2022
              </span>
            </Text>
            <Text>
              Renew licence by{' '}
              <span style={{ color: textColordark, fontWeight: 'semi-bold' }}>
                September 9, 2023
              </span>
            </Text>
          </Flex>
        </Box>
      ) : (
        <Box>
          <Text my='4' fontWeight='bold' fontSize='lg' color={textColordark}>
            No subscription plan
          </Text>
          <Text my='4'>
            We are glad to have you here with us! Please complete your
            subscription in order to use all products
          </Text>
          <Button variant='homePrimary'>Subscribe</Button>
        </Box>
      )}
    </Card>
  )
}
