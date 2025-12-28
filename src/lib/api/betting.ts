import useApiRequest from "../fetch-controller";
import { apiEndpoints } from "./endpoints";

export function useGetParticipantBirds(eventId: string, breederId: number) {
  return useApiRequest({
    endpoint: apiEndpoints.betting.participantBirds(eventId, breederId),
    queryKey: ["participant-birds", eventId, String(breederId)],
    enabled: !!eventId && !!breederId,
  });
}

export function usePlaceBet() {
  return useApiRequest({
    endpoint: apiEndpoints.betting.placeBet,
    method: "POST",
    invalidateKeys: [{ queryKey: ["participant-birds"] }],
  });
}
