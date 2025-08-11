const authEndpoints = {
  login: "/auth/breeder/login",
  logout: "/auth/breeder/logout",
  signup: "/auth/breeder/signup",
  session: "/auth/session",
};

const userEndpoints = {
  currentUser: "/users/profile",
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
};

export const apiEndpoints = {
  auth: authEndpoints,
  user: userEndpoints,
  birds: birdsEndpoints,
  events: eventsEndpoints,
};
