import { InfoField, Tabs, type TabItem } from "@debjani6ghosh/bmc-ui-kit";
import { useQuery } from "@tanstack/react-query";
import { fetchControllers } from "../../Example3.service";

export function Controller() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["controllers"],
    queryFn: fetchControllers,
  });

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const tabs: TabItem[] = data.map((controller) => ({
    key: controller.id,
    label: controller.name,
    content: (
      <div>
        <InfoField label="Model" value={controller.model} />

        <InfoField label="Manufacturer" value={controller.manufacturer} />
        <InfoField label="Type" value={controller.type} />
        <InfoField
          label="Firmware Version"
          value={controller.firmwareVersion}
        />
        <InfoField label="Status" value={controller.status} />
        <InfoField label="Serial Number" value={controller.serialNumber} />
      </div>
    ),
  }));

  if (tabs.length === 0) {
    return <div>No Controllers found.</div>;
  }

  return <Tabs tabs={tabs} />;
}
