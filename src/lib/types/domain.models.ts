
export interface LoginModel {
    UserName    ?: string;
    Email       ?: string;
    CountryCode ?: string;
    Phone       ?: string;
    Password    ?: string;
    Otp         ?: string;
};

export interface ResponseData {
    Success: boolean;
    Message: string;
    Data  ?: unknown;
};

export interface UserRole {
    id          : number,
    RoleName    : string;
    Description?: string;
};
