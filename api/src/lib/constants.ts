
export const BASE_PATH = "/api" as const;

export const ZOD_ERROR_MESSAGES = {
  REQUIRED: "Required",
  EXPECTED_NUMBER: "Expected number, received nan",
  NO_UPDATES: "No updates provided",
  BAD_REQUEST: "Oops, I need more data!",

};

export const ZOD_ERROR_CODES = {
  INVALID_UPDATES: "invalid_updates",
};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
