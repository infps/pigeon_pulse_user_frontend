import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function useGetMyEvents() {
  return useApiRequest({
    endpoint: apiEndpoints.eventInventory.getmyevents,
    method: "GET",
    queryKey: ["eventInventory"],
  });
}
export function useCreateEventInventory() {
  return useApiRequest({
    endpoint: apiEndpoints.eventInventory.create,
    method: "POST",
    invalidateKeys: [{ queryKey: ["eventInventory"] }],
  });
}
