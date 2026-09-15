import "./Dashboard.css";
import {
  Card,
  StatusIndicator,
  DropdownButton,
  type Status,
  type DropdownItem,
} from "@debjani6ghosh/bmc-ui-kit";
import { Fragment } from "react";
import healthyIcon from "../../assets/circle-check.svg";
import criticalIcon from "../../assets/octagon-x.svg";
import warningIcon from "../../assets/triangle-alert.svg";
import unknownIcon from "../../assets/circle-check.svg";
import powerIcon from "../../assets/power_icon.svg";
import ledIcon from "../../assets/sun.svg";
import chevronIcon from "../../assets/chevron-down.svg";

const jobs = [
  { type: "Pending", count: 0 },
  { type: "In Progress", count: 5 },
  { type: "Finished", count: 15 },
];

const statusData: { title: string; status: Status }[] = [
  { title: "GPU", status: "critical" },
  { title: "Server Health", status: "warning" },
  { title: "System Health", status: "healthy" },
  { title: "Cooling", status: "healthy" },
  { title: "Processor", status: "healthy" },
  { title: "Memory", status: "healthy" },
  { title: "Intrusion", status: "healthy" },
  { title: "Voltages", status: "healthy" },
  { title: "Power Supplies", status: "critical" },
  { title: "Storage Health", status: "warning" },
];

const statusIcons: Record<Status, string> = {
  healthy: healthyIcon,
  critical: criticalIcon,
  warning: warningIcon,
  unknown: unknownIcon,
};

const statusDataWithIcons = statusData.map((item) => ({
  ...item,
  icon: statusIcons[item.status],
}));

const systemData: Record<string, string>[] = [
  { label: "Power State", value: "On" },
  { label: "Model", value: "PowerEdge R470" },
  { label: "Host Name", value: "WIN-K5710073NN9" },
  {
    label: "Operating System",
    value: "Microsoft Windows Server 2022 Standard",
  },
  { label: "Operating System Version", value: "xyz.18.9.23" },
  { label: "Service Tag", value: "xyz56rty" },
  { label: "IP Address", value: "10.10.101.0" },
];

const powerCtrlBtnOptions: DropdownItem[] = [
  {
    label: "Power On",
    onClick: () => {
      console.log("Powered On");
    },
  },
  { label: "Power Off", onClick: () => console.log("Power Off") },
  { label: "Power Cycle", onClick: () => console.log("Power Cycle") },
  {
    label: "Graceful Shutdown",
    onClick: () => console.log("Graceful Shutdown"),
  },
];

const ledOptions: DropdownItem[] = [
  {
    label: "LED On",
    onClick: () => {
      console.log("Switched on LED.");
    },
  },
  {
    label: "LED Off",
    onClick: () => {
      console.log("Switched off LED.");
    },
  },
];

export function Dashboard() {
  return (
    <div>
      <div className="btn-container">
        <DropdownButton
          label="Power Control"
          icon={<img src={powerIcon} alt="power-control" />}
          trailingIcon={<img src={chevronIcon} alt="dropdown icon" />}
          items={powerCtrlBtnOptions}
        />
        <DropdownButton
          label="LED Control"
          icon={<img src={ledIcon} alt="led-control" />}
          trailingIcon={<img src={chevronIcon} alt="dropdown icon" />}
          items={ledOptions}
        />
      </div>
      <div className="cards-container">
        <Card title="Server Health Information">
          <div className="status-grid">
            {statusDataWithIcons.map((item) => (
              <StatusIndicator
                key={item.title}
                title={item.title}
                status={item.status}
                icon={<img src={item.icon} alt={item.title} />}
              />
            ))}
          </div>
        </Card>

        <Card title="System Health Information">
          <div className="table-grid">
            {systemData.map((item) => (
              <Fragment key={item.label}>
                <div className="label">{item.label}</div>
                <div className="value">{item.value}</div>
              </Fragment>
            ))}
          </div>
        </Card>

        <Card title="Job Summary" footer="View All">
          <div>
            {jobs.map((job) => (
              <div className="job-section" key={job.type}>
                <div className="job-header">
                  <h3>
                    {job.type}: {job.count}
                  </h3>
                </div>
                <div className="job-content">
                  {job.count === 0 && <p>No {job.type} jobs </p>}
                  {job.count > 0 && (
                    <p>
                      {job.count} {job.type} jobs{" "}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
