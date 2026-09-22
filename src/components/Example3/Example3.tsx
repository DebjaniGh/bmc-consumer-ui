import { RoutingTabs, type RoutingTabItem } from "@debjani6ghosh/bmc-ui-kit";

const tabs: RoutingTabItem[] = [
  { label: "Controller", path: "controller" },
  { label: "Physical Disks", path: "physical-disks" },
  { label: "Enclosures", path: "enclosures" },
];

export function Example3() {
  return <RoutingTabs tabs={tabs} />;
}
