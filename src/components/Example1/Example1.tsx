import { DataGrid, type DatagridCol } from "@debjani6ghosh/bmc-ui-kit";

interface Person {
  id: number;
  name: string;
  role: string;
}

const myColumns: DatagridCol<Person>[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "role", headerName: "Role" },
];

const roles = ["Engineer", "Designer", "Manager", "QA", "Product Owner"];

const myRows: Person[] = [
  { id: 1, name: "Alice", role: "Engineer" },
  { id: 2, name: "Bob", role: "Designer" },
  { id: 3, name: "Charlie", role: "Manager" },
  ...Array.from({ length: 100 }, (_, i) => ({
    id: i + 4,
    name: `Person ${i + 4}`,
    role: roles[i % roles.length],
  })),
];

export function Example1() {
  return <DataGrid columns={myColumns} rows={myRows} />;
}
