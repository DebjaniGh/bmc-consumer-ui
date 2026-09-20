export interface SystemInfo {
  id: string;
  hostName: string;
  assetTag: string;
  location: string;
  adminContact: string;
  model: string;
  serviceTag: string;
  biosVersion: string;
  os: string;
  osVersion: string;
  ipAddress: string;
  updatedAt: string;
}

export type EditableKey = "hostName" | "assetTag" | "location" | "adminContact";
export type SystemInfoPatch = Partial<Pick<SystemInfo, EditableKey>>;

export async function fetchSystemInfo(): Promise<SystemInfo> {
  const res = await fetch("/api/system-info");
  if (!res.ok) {
    throw new Error(`Request failed, ${res.status}`);
  }
  return res.json();
}

export async function patchSystemInfo(
  patch: SystemInfoPatch,
): Promise<SystemInfo> {
  const res = await fetch("/api/system-info", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });

  if (!res.ok) {
    throw new Error(`Request failed, ${res.status}`);
  }

  return res.json();
}
