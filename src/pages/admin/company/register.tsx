import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react'
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable'
import CheckTable from 'views/admin/dataTables/components/CheckTable'
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable'
import ComplexTable from 'views/admin/dataTables/components/ComplexTable'
import { columnsDataUsers } from 'views/admin/dataTables/variables/columnsData'
import tableDataUser from 'views/admin/dataTables/variables/tableDataUser.json'
import React from 'react'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import PercormanceCard from 'views/admin/dataTables/components/PerformanceCard'
import OperationalConditionsCard from 'views/admin/dataTables/components/OperationalConditionsCard'
import PerformanceInsCard from 'views/admin/dataTables/components/PerformanceInsCard'
import Calibrations from 'views/admin/dataTables/components/Calibrations'
import LeverarmCard from 'views/admin/dataTables/components/LeverarmCard'
import CloudPoints from 'views/admin/dataTables/components/CloudPoints'
import UserTableComplex from 'views/admin/dataTables/components/UserTableComplex'

export default function RegisterCompany() {
  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
          <UserTableComplex
            columnsData={columnsDataUsers}
            tableData={tableDataUser as unknown as TableData[]}
          />
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
