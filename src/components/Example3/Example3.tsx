import { Tabs, type TabItem } from "@debjani6ghosh/bmc-ui-kit";

const tabs: TabItem[] = [
  { label: "Controller", path: "controller" },
  { label: "Physical Disks", path: "physical-disks" },
  { label: "Enclosures", path: "enclosures" },
];

export function Example3() {
  return <Tabs tabs={tabs} />;
}
