const authEndpoints = {
  login: "/auth/breeder/login",
  logout: "/auth/breeder/logout",
  signup: "/auth/breeder/signup",
  session: "/auth/breeder/session",
};

const userEndpoints = {
  currentUser: "/users/breeder/profile",
};

const birdsEndpoints = {
  all: "/birds",
  create: "/birds",
  update: (id: string) => `/birds/${id}`,
};

const eventsEndpoints = {
  all: "/events",
  byId: (id: string) => `/events/${id}`,
  more: (id: string) => `/events/${id}/more`,
  participants: (id: string) => `/events/${id}/participants`,
};

const eventInventoryEndpoints = {
  create: "/event-inventory",
  getmyevents: "/event-inventory/my-events",
};

const paymentEndpoints = {
  capture: "/payments/capture",
  cancel: "/payments/cancel",
  my: "/payments/my",
  createOrder: (id: string) => `/payments/${id}/create-order`,
};

const teamEndpoints = {
  create: "/users/teams",
  byBreederId: (breederId: string) => `/users/teams/${breederId}`,
  update: (teamId: string) => `/users/teams/${teamId}`,
  delete: (teamId: string) => `/users/teams/${teamId}`,
};

export const apiEndpoints = {
  auth: authEndpoints,
  user: userEndpoints,
  birds: birdsEndpoints,
  events: eventsEndpoints,
  eventInventory: eventInventoryEndpoints,
  payment: paymentEndpoints,
  team: teamEndpoints,
};
