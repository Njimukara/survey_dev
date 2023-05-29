interface IColumnHeader {
  Header: string;
  accessor: string;
}

type Columns = IColumnHeader[];

export const columnsDataDevelopment: Columns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "TECH",
    accessor: "tech",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export const columnsDataCheck: Columns = [
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

export const columnsDataColumns: Columns = [
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

export const columnsDataComplex: Columns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export const columnsDataUsers: Columns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "DATE JOINED",
    accessor: "date_joined",
  },
  {
    Header: "BLOCK",
    accessor: "block",
  },
  {
    Header: "DELETE",
    accessor: "delete",
  },
];

export const PendingInvite: Columns = [
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "EXPIRY",
    accessor: "expires_on",
  },
  {
    Header: "COPY LINK",
    accessor: "invitation_url",
  },
  {
    Header: "RESEND",
    accessor: "resend",
  },
  {
    Header: "REVOKE",
    accessor: "revoke",
  },
];
