import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const rounded = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'gray.200',
    // background: 'gray.50',
    borderRadius: '16px',
    height: '50px',

    // Let's also provide dark mode alternatives
    _dark: {
      borderColor: 'gray.600',
      background: 'gray.800',
    },
  },
  addon: {
    border: '1px solid',
    borderColor: 'gray.200',
    // background: 'gray.200',
    borderRadius: '16px',
    height: '50px',
    color: 'gray.500',

    _dark: {
      borderColor: 'gray.600',
      background: 'gray.600',
      color: 'gray.400',
    },
  },
})

export const inputTheme = defineMultiStyleConfig({
  variants: { rounded },
})
