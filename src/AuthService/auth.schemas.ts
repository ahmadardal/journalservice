const AuthResponse = {
  200: {
    description: "Success response",
    type: "object",
    properties: {
      success: {
        description: "If the request was successful",
        type: "boolean",
      },
      message: { description: "Message to return to client", type: "string" },
      token: {description: "The JWT token.", type: "string"}
    },
  },
};

export const RegisterSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { description: "Full name of the user", type: "string" },
      email: { description: "Email address of the user", type: "string" },
      password: { description: "A password for the user", type: "string" },
    },
  },
  response: AuthResponse,
};

export const LoginSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { description: "Email address of the user", type: "string" },
      password: { description: "A password for the user", type: "string" },
    },
  },
  response: AuthResponse,
};
