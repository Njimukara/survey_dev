import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react'
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable'
import CheckTable from 'views/admin/dataTables/components/CheckTable'
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable'
import ComplexTable from 'views/admin/dataTables/components/ComplexTable'
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from 'views/admin/dataTables/variables/columnsData'
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment.json'
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck.json'
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns.json'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex.json'
import React from 'react'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import PercormanceCard from 'views/admin/dataTables/components/PerformanceCard'
import OperationalConditionsCard from 'views/admin/dataTables/components/OperationalConditionsCard'
import PerformanceInsCard from 'views/admin/dataTables/components/PerformanceInsCard'
import Calibrations from 'views/admin/dataTables/components/Calibrations'
import LeverarmCard from 'views/admin/dataTables/components/LeverarmCard'
import CloudPoints from 'views/admin/dataTables/components/CloudPoints'

export default function DataTables() {
  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <PercormanceCard />
        <Flex mt='15px'>
          <PerformanceInsCard mr='15px' />
          <OperationalConditionsCard />
        </Flex>
        <Flex mt='15px' mb='4'>
          <Calibrations mr='15px' />
          <LeverarmCard />
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
          <CloudPoints />
        </SimpleGrid>
        <Flex mt='4' justifyContent='center' alignItems='center'>
          <Button variant='homePrimary' size='lg'>
            Generate Survey
          </Button>
        </Flex>
      </Box>
    </AdminLayout>
  )
}
