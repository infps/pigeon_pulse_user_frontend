import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function listfirebird({ params }: { params: Record<string, string> }) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.fireBirdEndpoints.base,
    queryKey: ["firebird", "list", queryParams],
    params,
  });
}
