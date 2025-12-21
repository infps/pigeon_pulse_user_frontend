import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function useCreateTeam() {
  return useApiRequest({
    endpoint: apiEndpoints.team.create,
    method: "POST",
    invalidateKeys: [{ queryKey: ["teams"] }],
  });
}

export function useGetBreederTeams(breederId: string) {
  return useApiRequest({
    endpoint: apiEndpoints.team.byBreederId(breederId),
    method: "GET",
    queryKey: ["teams", breederId],
  });
}

export function useUpdateTeam(teamId: string) {
  return useApiRequest({
    endpoint: apiEndpoints.team.update(teamId),
    method: "PUT",
    invalidateKeys: [{ queryKey: ["teams"] }],
  });
}

export function useDeleteTeam(teamId: string) {
  return useApiRequest({
    endpoint: apiEndpoints.team.delete(teamId),
    method: "DELETE",
    invalidateKeys: [{ queryKey: ["teams"] }],
  });
}
