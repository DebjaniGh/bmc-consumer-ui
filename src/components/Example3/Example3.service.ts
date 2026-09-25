export interface Controller {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  type: string;
  firmwareVersion: string;
  status: string;
  serialNumber: string;
}

export interface Enclosure {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  status: string;
  slotCount: number;
  firmwareVersion: string;
}

export interface PhysicalDisk {
  id: string;
  controllerId: string;
  enclosureId: string | null;
  slotNumber: number;
  serialNumber: string;
  model: string;
  manufacturer: string;
  mediaType: string;
  capacity: string;
  interfaceType: string;
  status: string;
  firmwareVersion: string;
}

export interface PhysicalDiskFilter {
  controllerId?: string;
  enclosureId?: string;
  mediaType?: string;
}

export async function fetchControllers(): Promise<Controller[]> {
  const res = await fetch("/api/controllers");
  if (!res.ok) {
    throw new Error(`Request failed, ${res.status}`);
  }
  return res.json();
}

export async function fetchEnclosures(): Promise<Enclosure[]> {
  const res = await fetch("/api/enclosures");
  if (!res.ok) {
    throw new Error(`Request failed, ${res.status}`);
  }
  return res.json();
}

export async function fetchPhysicalDisks(
  filter: PhysicalDiskFilter = {},
): Promise<PhysicalDisk[]> {
  // create an empty container for query parameters
  const params = new URLSearchParams(); // only adds the controllerId param if it's actually present on the filter object
  if (filter.controllerId) params.set("controllerId", filter.controllerId);
  if (filter.enclosureId) params.set("enclosureId", filter.enclosureId);
  if (filter.mediaType) params.set("mediaType", filter.mediaType);

  const query = params.toString();
  const res = await fetch(`/api/physical-disks${query ? `?${query}` : ""}`);
  if (!res.ok) {
    throw new Error(`Request failed, ${res.status}`);
  }
  return res.json();
}
