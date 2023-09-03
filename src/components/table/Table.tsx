import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Button, Icon, Input } from "@chakra-ui/react";
import react, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { MdMore, MdViewDay } from "react-icons/md";

const columns = [
  {
    name: "ID",
    selector: (row: { id: number }) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: { name: string }) => row.name,
    sortable: true,
  },
  {
    name: "Position",
    selector: (row: { position: string }) => row.position,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row: { department: string }) => row.department,
    sortable: true,
  },
  {
    name: "Age",
    selector: (row: { age: number }) => row.age,
    sortable: true,
  },
  {
    name: "Salary",
    selector: (row: { salary: string }) => row.salary,
    sortable: true,
    cell: (row: DataItem) => `$${row.salary.toLocaleString()}`,
  },
  {
    name: "Actions",
    selector: (row: { id: number }) => row.id,
    cell: (row: DataItem) => (
      <div>
        <Button background="none" onClick={() => handleEdit(row.id)}>
          <Icon as={MdMore} color={"blue.200"} />
        </Button>
      </div>
    ),
  },
];

const tableStyles = {
  table: {
    style: {
      fontFamily: "Poppins, sans-serif", // Modify the font family
    },
  },
  rows: {
    style: {
      fontSize: "16px",
      fontWeight: "400",
    },
  },
  headCells: {
    style: {
      fontWeight: "600",
      fontSize: "18px",
      TextDecoration: "uppercase",
    },
  },
};

interface DataItem {
  id: number;
  name: string;
  position: string;
  department: string;
  age: number;
  salary: string;
}

interface TableProps {
  data: DataItem[];
  tableName?: string;
}

export default function Table(props: TableProps) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  const filteredData = props.data?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.position.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" pt="2">
        <Input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          style={{ flex: 1, maxWidth: "60%" }}
        />
      </Box>
      <DataTable
        title={props.tableName}
        pagination
        highlightOnHover
        columns={columns}
        paginationPerPage={4}
        paginationRowsPerPageOptions={[10, 20, 30]}
        data={filteredData}
        customStyles={tableStyles}
      />
      ;
    </Box>
  );
}
function handleEdit(id: number): void {
  console.log("fromedit", id);
}

function handleDelete(id: number): void {
  console.log("from delete", id);
}
