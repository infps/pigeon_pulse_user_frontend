import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function listMyLofts({ params }: { params: Record<string, string> }) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.loftEndpoints.base,
    queryKey: ["lofts", "list", queryParams],
    params,
  });
}

export function getLoft({
  params,
  loftId,
}: {
  params: Record<string, string>;
  loftId: string;
}) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.loftEndpoints.getLoft(loftId),
    queryKey: ["lofts", "get", loftId, queryParams],
    params,
  });
}
export function creatteLoft({ params }: { params: Record<string, string> }) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.loftEndpoints.create,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    queryKey: ["lofts", "create", queryParams],
    params,
    invalidateKeys: [{ queryKey: ["lofts", "list"], exact: false }],
  });
}
export function updateLoft({
  params,
  loftId,
}: {
  params: Record<string, string>;
  loftId: string;
}) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.loftEndpoints.updateLoft(loftId),
    queryKey: ["lofts", "update", loftId, queryParams],
    method: "PUT",
    params,
    exact: true,
    invalidateKeys: [
      { queryKey: ["lofts", "list"], exact: false },
      { queryKey: ["lofts", "get", loftId], exact: false },
    ],
  });
}
