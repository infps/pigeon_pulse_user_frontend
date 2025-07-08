import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function getMyPayments({ params }: { params: Record<string, string> }) {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return useApiRequest({
    endpoint: apiEndpoints.paymentsEndpoints.base,
    queryKey: ["payments", "my", queryParams],
    params,
  });
}
