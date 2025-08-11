import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function useCapturePayment() {
  return useApiRequest({
    endpoint: apiEndpoints.payment.capture,
    method: "POST",
    invalidateKeys: [{ queryKey: ["payments"] }],
  });
}
