import { Tabs, type TabItem } from "@debjani6ghosh/bmc-ui-kit";

const tabs: TabItem[] = [
  {
    key: "Controller1",
    label: "Controller 1",
    content: <div>Details of Controller 1</div>,
  },
  {
    key: "Controller2",
    label: "Controller 2",
    content: <div>Details of Controller 2</div>,
  },
];

export function Controller() {
  return <Tabs tabs={tabs} />;
}
