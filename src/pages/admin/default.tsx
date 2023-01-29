/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
// Assets
// Custom components
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from 'react-icons/md'
import SurveyTable from 'views/admin/default/components/SurveyTable'
import {
  columnsDataSurvey,
  TableData,
} from 'views/admin/default/variables/columnsData'
import tableDataSurvey from 'views/admin/default/variables/tableDataSurvey.json'
import AdminLayout from 'layouts/admin'
import CurrentPlan from 'views/admin/default/components/CurrentPlan'
import Offers from 'views/admin/default/components/Offers'

export default function UserReports() {
  // Chakra Color Mode

  const brandColor = useColorModeValue('brand.500', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
            <CurrentPlan />
            <Offers />
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} mb='20px'>
            <SurveyTable
              columnsData={columnsDataSurvey}
              tableData={tableDataSurvey as unknown as TableData[]}
            />
          </SimpleGrid>
        </>
      </Box>
    </AdminLayout>
  )
}
