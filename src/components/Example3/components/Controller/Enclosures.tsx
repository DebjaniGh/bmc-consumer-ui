import { useQuery } from "@tanstack/react-query";
import { fetchEnclosures } from "../../Example3.service";
import { InfoField, Tabs, type TabItem } from "@debjani6ghosh/bmc-ui-kit";

export function Enclosures() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["enclosures"],
    queryFn: fetchEnclosures,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const tabs: TabItem[] = data.map((enclosure) => ({
    key: enclosure.id,
    label: enclosure.name,
    content: (
      <div>
        <InfoField label="Name" value={enclosure.name} />
        <InfoField label="Model" value={enclosure.model} />
        <InfoField label="Manufacturer" value={enclosure.manufacturer} />
        <InfoField label="Serial Number" value={enclosure.serialNumber} />
        <InfoField label="Status" value={enclosure.status} />
        <InfoField label="Slot Count" value={String(enclosure.slotCount)} />
        <InfoField label="Firmware Version" value={enclosure.firmwareVersion} />
      </div>
    ),
  }));
  return <Tabs tabs={tabs} />;
}
