import { Button, Flex } from "@chakra-ui/react";
import React from "react";

// Define the TableColumn interface
export interface TableColumn {
  Header: string;
  accessor: string;
  Cell?: (cellProps: any) => JSX.Element;
  download?: (rowData: any) => void; // Function to handle download
}

// Define the ReusableTableProps interface
export interface ReusableTableProps {
  columns: TableColumn[];
  data: any[];
  searchPlaceholder: string;
  tableName?: string;
}

// Sample data generation based on the interface
export const columns: TableColumn[] = [
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
    Cell: ({ cell: { value } }) => (
      // Custom Cell component for the "Actions" column
      <button
        style={{
          backgroundColor: "green", // Green background color
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => handleButtonClick(value)} // Access the ID from the row data
      >
        Button
      </button>
    ),
  },
  {
    Header: "DATE GENERATED",
    accessor: "created",
  },
  {
    Header: "ACTIONS",
    accessor: "actions",
  },
  {
    Header: "Actions", // Customize the column header
    accessor: "id", // Assuming "id" is the unique identifier for each row
  },
];

export const data: any[] = [
  {
    id: 1, // Unique identifier for the row
    name: "John Doe",
    position: "Developer",
    department: "Engineering",
    age: 28,
    salary: 65000,
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Designer",
    department: "Creative",
    age: 25,
    salary: 55000,
  },
  {
    id: 3,
    name: "Robert Johnson",
    position: "Manager",
    department: "Management",
    age: 35,
    salary: 75000,
  },
  // Add more data rows as needed
];

function handleButtonClick(id: number) {
  console.log(`Button clicked for ID: ${id}`);
}
