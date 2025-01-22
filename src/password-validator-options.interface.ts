export interface PasswordValidatorOptions {
    minLength?: LengthRule;
    maxLength?: LengthRule;
    hasUpperCase?: HasRule;
    hasLowerCase?: HasRule;
    hasNumbers?: HasRule;
    hasSpecialChars?: HasSpecialCharsRule;
    blacklist?: BlacklistRule;
    confirmPassword?: ConfirmPasswordRule;
}
export interface LengthRule {
    message?: string;
    enabled: boolean;
    length?: number;
}
export interface BlacklistRule {
    message?: string;
    enabled: boolean;
    values: string[];
}
export interface HasSpecialCharsRule {
    message?: string;
    enabled: boolean;
    characters?: string[];
}

export interface HasRule {
    message?: string;
    enabled: boolean;
}
export interface ConfirmPasswordRule {
    message?: string;
    enabled: boolean;
    compareToProperty?: string;
}
