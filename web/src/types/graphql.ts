export interface AuthPayload {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  }