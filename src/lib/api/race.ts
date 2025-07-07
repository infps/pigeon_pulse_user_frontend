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
