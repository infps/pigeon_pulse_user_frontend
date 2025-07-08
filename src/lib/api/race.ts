import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function listRaces({ params }: { params: Record<string, string> }) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.raceEndpoints.base,
    queryKey: ["races", "list", queryParams],
    params,
  });
}

export function getMyRaces({ params }: { params: Record<string, string> }) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.raceEndpoints.myraces,
    queryKey: ["races", "my", queryParams],
    params,
  });
}

export function getRace({
  params,
  raceId,
}: {
  params: Record<string, string>;
  raceId: string;
}) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.raceEndpoints.getRaceById(raceId),
    queryKey: ["races", "get", raceId, queryParams],
    params,
  });
}
