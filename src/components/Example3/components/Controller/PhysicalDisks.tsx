import { DataGrid, type DatagridCol } from "@debjani6ghosh/bmc-ui-kit";
import { useQuery } from "@tanstack/react-query";
import { fetchPhysicalDisks, type PhysicalDisk } from "../../Example3.service";

const columns: DatagridCol<PhysicalDisk>[] = [
  { field: "slotNumber", headerName: "Slot" },
  { field: "serialNumber", headerName: "Serial Number" },
  { field: "model", headerName: "Model" },
  { field: "manufacturer", headerName: "Manufacturer" },
  { field: "mediaType", headerName: "Media Type" },
  { field: "capacity", headerName: "Capacity" },
  { field: "interfaceType", headerName: "Interface" },
  { field: "status", headerName: "Status" },
  { field: "firmwareVersion", headerName: "Firmware Version" },
];

export function PhysicalDisks() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["physical-disks"],
    queryFn: fetchPhysicalDisks,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data.length === 0) return <div>No Physical Disks found.</div>;

  return <DataGrid columns={columns} rows={data} />;
}
