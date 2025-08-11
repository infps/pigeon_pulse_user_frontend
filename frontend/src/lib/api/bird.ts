import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function useListBirds() {
  return useApiRequest({
    endpoint: apiEndpoints.birds.all,
    method: "GET",
    queryKey: ["birds"],
  });
}

export function useCreateBird() {
  return useApiRequest({
    endpoint: apiEndpoints.birds.create,
    method: "POST",
    invalidateKeys: [{ queryKey: ["birds"] }],
  });
}

export function useUpdateBird(id: string) {
  return useApiRequest({
    endpoint: apiEndpoints.birds.update(id),
    method: "PUT",
    invalidateKeys: [{ queryKey: ["birds"] }],
  });
}
