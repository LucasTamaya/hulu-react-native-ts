import { setupServer } from "msw/node";

import { handlers } from "./../tests/utils";

export const server = setupServer(...handlers);
