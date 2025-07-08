const raceEndpoints = {
  base: "/race",
  myraces: "/user/races",
  getRaceById: (id: string)=>`/race/${id}`,
};

const loftEndpoints = {
  base: "/user/lofts",
  create: "/user/lofts/create",
  getLoft: (id: string) => `/user/lofts/${id}`,
  updateLoft: (id: string) => `/user/lofts/${id}`,
  createBird: (loftId: string) => `/user/lofts/${loftId}/birds/create`,
  getBird: (birdId: string) => `/user/birds/${birdId}`,
  updateBird: (birdId: string) => `/user/birds/${birdId}`,
  getSharedLofts: `/user/shared-lofts`,
  getLoftInvitations: `/user/lofts/invitations`,
  acceptLoftInvitation: (invitationId: string) => `/user/lofts/invitations/accept/${invitationId}`,
  rejectLoftInvitation: (invitationId: string) => `/user/lofts/invitations/reject/${invitationId}`,
  inviteToLoft: (loftId: string) => `/user/lofts/invite/${loftId}`,
};

const paymentsEndpoints = {
  base: "/user/payments",
};

const userEndpoints = {
  base: "/user",
};
export const apiEndpoints = {
  raceEndpoints,
  loftEndpoints,
  paymentsEndpoints,
  userEndpoints,
};
