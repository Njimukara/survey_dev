import { Column } from 'react-table'
import tableDataCheck from './tableDataCheck.json'

export const columnsDataCheck = [
  {
    Header: 'NAME',
    accessor: 'name',
  },
  {
    Header: 'PROGRESS',
    accessor: 'progress',
  },
  {
    Header: 'QUANTITY',
    accessor: 'quantity',
  },
  {
    Header: 'DATE',
    accessor: 'date',
  },
]
export const columnsDataComplex = [
  {
    Header: 'AMOUNT',
    accessor: 'amount',
  },
  {
    Header: 'STATUS',
    accessor: 'status',
  },
  {
    Header: 'DATE',
    accessor: 'date',
  },
  {
    Header: 'PAYMENT',
    accessor: 'payment',
  },
]

export const columnsDataSurvey = [
  // {
  //   Header: 'ID',
  //   accessor: 'id',
  // },
  {
    Header: 'NAME',
    accessor: 'name',
  },
  {
    Header: 'DOWNLOAD',
    accessor: 'download',
  },
  {
    Header: 'DATE GENERATED',
    accessor: 'date generated',
  },
  {
    Header: 'ACTIONS',
    accessor: 'actions',
  },
]

export type ColumnData = Column[]

export type TableData = Column<{
  // id?: string
  name: (string | boolean)[]
  date: string
  progress?: number
  download?: string
  actions?: string
  quantity?: number
  status?: string
  artworks?: string
  rating?: number
}>

export type TableProps = {
  columnsData: ColumnData
  tableData: TableData[]
}
