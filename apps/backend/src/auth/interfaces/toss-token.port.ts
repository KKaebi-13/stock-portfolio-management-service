export interface TossToken {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
  }
  
  export const TOSS_TOKEN_PORT = Symbol('TOSS_TOKEN_PORT');
  
  export interface TossTokenPort {
    issueToken(): Promise<TossToken>;
  }

  