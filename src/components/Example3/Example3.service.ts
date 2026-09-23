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

export async function fetchControllers(): Promise<Controller[]> {
  const res = await fetch("/api/controllers");
  if (!res.ok) {
    throw new Error(`Request failed, ${res.status}`);
  }
  return res.json();
}
