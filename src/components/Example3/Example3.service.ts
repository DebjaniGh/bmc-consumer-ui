interface Controller {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  type: string;
  firmwareVersion: string;
  status: string;
  serialNumber: string;
}

interface Enclosure {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  status: string;
  slotCount: number;
  firmwareVersion: string;
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

export async function fetchPhysicalDisks(): Promise<PhysicalDisk[]> {
  const res = await fetch("/api/physical-disks");
  if (!res.ok) {
    throw new Error(`Request failed, ${res.status}`);
  }
  return res.json();
}
