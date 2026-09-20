import { Form, TextField, InfoField, Button } from "@debjani6ghosh/bmc-ui-kit";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSystemInfo,
  patchSystemInfo,
  type SystemInfo,
  type EditableKey,
  type SystemInfoPatch,
} from "./Example2.service";
import "./Example2.css";

// Config-driven form: each row's label, source field, and editable/read-only
// mode is declared once here, then mapped to TextField/InfoField below.
interface FieldConfig {
  key: keyof SystemInfo;
  label: string;
  editable: boolean;
}

const fieldConfig: FieldConfig[] = [
  { key: "hostName", label: "Host Name", editable: true },
  { key: "assetTag", label: "Asset Tag", editable: true },
  { key: "location", label: "Location", editable: true },
  { key: "adminContact", label: "Admin Contact", editable: true },
  { key: "model", label: "Model", editable: false },
  { key: "serviceTag", label: "Service Tag", editable: false },
  { key: "biosVersion", label: "BIOS Version", editable: false },
  { key: "os", label: "Operating System", editable: false },
  { key: "osVersion", label: "OS Version", editable: false },
  { key: "ipAddress", label: "IP Address", editable: false },
];

// Compares the last-fetched record against the in-progress form values and
// returns only the fields that actually changed -- this is both the PATCH
// body (server only accepts editable keys) and the basis for the dirty check.
function diffEditableFields(
  original: SystemInfo,
  edited: SystemInfo,
): SystemInfoPatch {
  const patch: SystemInfoPatch = {};
  for (const field of fieldConfig) {
    if (!field.editable) continue;
    const key = field.key as EditableKey;
    if (original[key] !== edited[key]) {
      patch[key] = edited[key];
    }
  }
  return patch;
}

export function Example2() {
  // const [data, setData] = useState<SystemInfo | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   async function loadData() {
  //     try {
  //       const res = await fetch("/api/system-info");
  //       if (!res.ok) {
  //         throw new Error(`Request failed, ${res.status}`);
  //       }
  //       const receivedData: SystemInfo = await res.json();
  //       setData(receivedData);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Failed to load data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadData();
  // }, []);
  // queryKey ["system-info"] is the cache slot this GET reads/writes -- the
  // same key is reused in patchMutation's onSuccess below to update it.
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["system-info"],
    queryFn: fetchSystemInfo,
  });

  const [formData, setFormData] = useState<SystemInfo | null>(null);

  /** 'data' from useQuery is the server's data, we cannot mutate it directly
   * so formData (initiliazed with 'data') is our local editable copy
   */
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleFieldChange = (key: EditableKey, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const patchMutation = useMutation({
    mutationFn: patchSystemInfo,
    // Update the cached value for ['system-info'] to updated, so every component reading that query
    // sees the new data immediately, without re-fetching.
    onSuccess: (updated) => {
      queryClient.setQueryData(["system-info"], updated);
    },
  });

  // Discard in-progress edits: since `data` was never mutated by typing,
  // resetting formData back to it restores the last-saved values.
  const handleCancel = () => {
    if (data) {
      setFormData(data);
    }
  };

  const handleApply = () => {
    if (!data || !formData) {
      return;
    }
    const patch = diffEditableFields(data, formData);
    // Nothing actually changed (e.g. user edited then reverted) -- avoid an
    // empty PATCH, which the server's validation would reject anyway.
    if (Object.keys(patch).length === 0) {
      return;
    }
    patchMutation.mutate(patch); // explicitly trigger the mutation
  };

  const isDirty =
    data && formData
      ? Object.keys(diffEditableFields(data, formData)).length > 0
      : false;

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!formData) return null;

  return (
    <Form onSubmit={() => {}}>
      {fieldConfig.map((field) =>
        field.editable ? (
          <TextField
            key={field.key}
            label={field.label}
            value={formData[field.key]}
            onChange={(e) =>
              handleFieldChange(field.key as EditableKey, e.target.value)
            }
          />
        ) : (
          <InfoField
            key={field.key}
            label={field.label}
            value={formData[field.key]}
          />
        ),
      )}
      <div className="buttons">
        <Button
          type="button"
          label="Cancel"
          variant="secondary"
          onClick={handleCancel}
          disabled={!isDirty || patchMutation.isPending}
        />
        <Button
          type="button"
          label="Apply"
          variant="primary"
          onClick={handleApply}
          disabled={!isDirty || patchMutation.isPending}
        />
      </div>
    </Form>
  );
}
