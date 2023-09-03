import { Column } from "react-table";
import tableDataCheck from "./tableDataCheck.json";

export const columnsDataCheck = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];
export const columnsDataComplex = [
  {
    Header: "AMOUNT",
    accessor: "plan",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: "start_date",
  },
  {
    Header: "PAYMENT",
    accessor: "payment",
  },
];

export const RealComplexHeader = [
  {
    Header: "AMOUNT",
    accessor: "plan",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: "start_date",
  },
  {
    Header: "PAYMENT",
    accessor: "payment",
  },
];

export const columnsDataSurvey = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "TYPE",
    accessor: "survey",
  },

  {
    Header: "DOWNLOAD",
    accessor: "download",
  },
  {
    Header: "DATE GENERATED",
    accessor: "created",
  },
  {
    Header: "ACTIONS",
    accessor: "actions",
  },
];

export type ColumnData = Column[];

export type TableData = Column<{
  // id?: string
  name: (string | boolean)[];
  date: string;
  progress?: number;
  email?: number;
  isactive?: number;
  download?: string;
  actions?: string;
  quantity?: number;
  status?: string;
  artworks?: string;
  rating?: number;
}>;

export type TableProps = {
  columnsData?: ColumnData;
  tableData: TableData[];
  getInvitations?: any;
  getCompanyMembers?: [] | any;
};

export interface TableColumn {
  Header: string;
  accessor: string;
  Cell?: (cellProps: any) => JSX.Element;
  icon?: JSX.Element;
}
