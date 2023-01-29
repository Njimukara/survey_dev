import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'

// Custom components
import Card from 'components/card/Card'
import Menu from 'components/menu/MainMenu'

// Assets
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdDeleteOutline,
  MdEdit,
} from 'react-icons/md'
import { TableProps } from '../variables/columnsData'
export default function ColumnsTable(props: TableProps) {
  const { columnsData, tableData } = props

  const columns = useMemo(() => columnsData, [columnsData])
  const data = useMemo(() => tableData, [tableData])

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance
  initialState.pageSize = 5

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white')
  const whiteColor = useColorModeValue('white', 'white')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  const bgHover = useColorModeValue(
    { bg: 'green.600' },
    { bg: 'whiteAlpha.50' }
  )
  const bgFocus = useColorModeValue(
    { bg: 'green.600' },
    { bg: 'whiteAlpha.100' }
  )
  const nullbtnbgfocus = useColorModeValue({ bg: 'none' }, { bg: 'none' })
  return (
    <Card
      flexDirection='column'
      w='100%'
      px='0px'
      overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px='25px' justify='space-between' mb='10px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Generated Survey History
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: '10px', lg: '12px' }}
                    color='gray.400'>
                    {column.render('Header')}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data
                  if (cell.column.Header === 'NAME') {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    )
                  } else if (cell.column.Header === 'DOWNLOAD') {
                    data = (
                      <Flex align='center'>
                        <Button
                          size='xs'
                          bg='green.500'
                          color={whiteColor}
                          borderRadius='7px'
                          fontSize='xs'
                          fontWeight='400'
                          _hover={bgHover}
                          _focus={bgFocus}
                          _active={bgFocus}>
                          {cell.value}
                        </Button>
                      </Flex>
                    )
                  } else if (cell.column.Header === 'DATE GENERATED') {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='700'>
                        {cell.value}
                      </Text>
                    )
                  } else if (cell.column.Header === 'ACTIONS') {
                    data = (
                      <Flex>
                        <Button
                          size='xs'
                          bg='none'
                          _hover={nullbtnbgfocus}
                          _focus={nullbtnbgfocus}
                          _active={nullbtnbgfocus}>
                          <Icon
                            as={MdEdit}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                          />
                        </Button>
                        <Button
                          size='xs'
                          bg='none'
                          _hover={nullbtnbgfocus}
                          _focus={nullbtnbgfocus}
                          _active={nullbtnbgfocus}>
                          <Icon
                            as={MdDeleteOutline}
                            w={5}
                            h={5}
                            color={textColorSecondary}
                          />
                        </Button>
                        {}
                      </Flex>
                    )
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: '14px' }}
                      maxH='30px !important'
                      py='8px'
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Card>
  )
}
