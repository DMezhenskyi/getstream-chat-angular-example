export interface SigninCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials extends SigninCredentials {
    displayName: string;
}