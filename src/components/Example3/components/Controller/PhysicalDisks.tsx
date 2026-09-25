import { DataGrid, type DatagridCol } from "@debjani6ghosh/bmc-ui-kit";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  fetchControllers,
  fetchEnclosures,
  fetchPhysicalDisks,
  type PhysicalDisk,
  type PhysicalDiskFilter,
} from "../../Example3.service";
import "./PhysicalDisks.css";

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

// "all" | "controller:<uuid>" | "enclosure:<uuid>" -- controllerId and
// enclosureId are mutually exclusive, so one string can only ever encode one.
type LocationFilter = string;

export function PhysicalDisks() {
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("all");
  const [mediaType, setMediaType] = useState<string>("all");

  const { data: controllers = [] } = useQuery({
    queryKey: ["controllers"],
    queryFn: fetchControllers,
  });
  const { data: enclosures = [] } = useQuery({
    queryKey: ["enclosures"],
    queryFn: fetchEnclosures,
  });

  const filter: PhysicalDiskFilter = {};

  if (locationFilter.startsWith("controller:")) {
    filter.controllerId = locationFilter.slice("controller:".length);
  } else if (locationFilter.startsWith("enclosure:")) {
    filter.enclosureId = locationFilter.slice("enclosure:".length);
  }

  if (mediaType !== "all") {
    filter.mediaType = mediaType;
  }

  const {
    data: disks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["physical-disks", filter],
    queryFn: () => fetchPhysicalDisks(filter),
  });

  return (
    <div>
      <div className="filters">
        <label className="filterLabel">
          Location:
          <select
            className="filterSelect"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="all">All</option>
            <optgroup label="Controller">
              {controllers.map((controller) => (
                <option
                  key={controller.id}
                  value={`controller:${controller.id}`}
                >
                  {controller.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Enclosure">
              {enclosures.map((enclosure) => (
                <option key={enclosure.id} value={`enclosure:${enclosure.id}`}>
                  {enclosure.name}
                </option>
              ))}
            </optgroup>
          </select>
        </label>

        <label className="filterLabel">
          Media Type:
          <select
            className="filterSelect"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="HDD">HDD</option>
            <option value="SSD">SSD</option>
          </select>
        </label>
      </div>

      {isLoading && <div>Loading ...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && disks.length === 0 && (
        <div>No Physical Disks found.</div>
      )}
      {!isLoading && !error && disks.length > 0 && (
        <DataGrid columns={columns} rows={disks} />
      )}
    </div>
  );
}
