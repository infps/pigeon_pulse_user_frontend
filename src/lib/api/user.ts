import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function listUsers({ params }: { params: Record<string, string> }) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.userEndpoints.base,
    queryKey: ["users", "list", queryParams],
    params,
  });
}
