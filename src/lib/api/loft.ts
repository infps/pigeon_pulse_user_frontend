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

export function createBird({
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
    endpoint: apiEndpoints.loftEndpoints.createBird(loftId),
    method: "POST",
    headers: {},
    bodyType: "formdata",
    queryKey: ["lofts", "createBird", loftId, queryParams],
    params,
    invalidateKeys: [{ queryKey: ["lofts", "get", loftId], exact: false }],
  });
}

export function getBird({
  params,
  birdId,
}: {
  params: Record<string, string>;
  birdId: string;
}) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.loftEndpoints.getBird(birdId),
    queryKey: ["birds", "get", birdId, queryParams],
    params,
  });
}

export function updateBird({
  params,
  birdId,
}: {
  params: Record<string, string>;
  birdId: string;
}) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.loftEndpoints.updateBird(birdId),
    method: "PUT",
    queryKey: ["birds", "update", birdId, queryParams],
    params,
    invalidateKeys: [{ queryKey: ["birds", "get", birdId], exact: false }],
  });
}