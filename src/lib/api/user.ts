import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function useCurrentUser() {
  return useApiRequest({
    endpoint: apiEndpoints.user.currentUser,
    method: "GET",
    queryKey: ["currentUser"],
  });
}

export function useUpdateCurrentUser() {
  return useApiRequest({
    endpoint: apiEndpoints.user.currentUser,
    method: "PUT",
    invalidateKeys: [{ queryKey: ["currentUser"] }],
  });
}
