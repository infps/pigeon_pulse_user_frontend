import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function useCapturePayment() {
  return useApiRequest({
    endpoint: apiEndpoints.payment.capture,
    method: "POST",
    invalidateKeys: [{ queryKey: ["payments"] }],
  });
}

export function useGetMyPayments() {
  return useApiRequest({
    endpoint: apiEndpoints.payment.my,
    method: "GET",
    queryKey: ["payments"],
  });
}
