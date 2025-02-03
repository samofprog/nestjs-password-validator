import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import {
    BlacklistRule,
    ConfirmPasswordRule,
    HasRule,
    HasSpecialCharsRule,
    LengthRule,
    PasswordValidatorOptions,
} from "../password-validator-options.interface";

@ValidatorConstraint({ async: true })
export class PasswordConstraint implements ValidatorConstraintInterface {
    protected readonly defaultMessages = {
        blacklist: "Password is blacklisted",
        hasLowerCase: "Password must have at least one lowercase letter",
        hasNumbers: "Password must have at least one number",
        hasSpecialChars: "Password must have at least one special character",
        hasUpperCase: "Password must have at least one uppercase letter",
        minLength: "Password is too short",
        maxLength: "Password is too long",
        confirmPassword: "Passwords do not match",
    };
    protected readonly defaultSpecialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
    ];
    protected readonly defaultBlacklistValues = ["12345678", "password"];
    private errorMessage = "Password is invalid";
    private readonly defaultOptions = {
        blacklist: {
            enabled: true,
            values: this.defaultBlacklistValues,
            message: this.defaultMessages.blacklist,
        },
        hasLowerCase: {
            enabled: true,
            message: this.defaultMessages.hasLowerCase,
        },
        hasNumbers: {
            enabled: true,
            message: this.defaultMessages.hasNumbers,
        },
        hasSpecialChars: {
            enabled: true,
            message: this.defaultMessages.hasSpecialChars,
            characters: this.defaultSpecialChars,
        },
        hasUpperCase: {
            enabled: true,
            message: this.defaultMessages.hasUpperCase,
        },
        minLength: {
            enabled: true,
            length: 8,
            message: this.defaultMessages.minLength,
        },
        maxLength: {
            enabled: true,
            length: 15,
            message: this.defaultMessages.maxLength,
        },
        confirmPassword: {
            enabled: false,
            message: this.defaultMessages.confirmPassword,
            compareToProperty: "confirmPassword",
        },
    };

    // Validate the password based on provided options or defaults
    validate(
        value: string,
        args: ValidationArguments
    ): Promise<boolean> | boolean {
        const options: PasswordValidatorOptions = this.mergeWithDefaults(
            args.constraints[0] ?? {}
        );

        const obj = args.object as Record<string, any>;
        if (
            options?.confirmPassword?.enabled &&
            !options?.confirmPassword?.compareToProperty
        ) {
            throw Error("compareToProperty must be defined");
        }
        const confirmPassword = options?.confirmPassword?.enabled
            ? obj[options?.confirmPassword?.compareToProperty]
            : undefined;

        return this.validatePassword(value, confirmPassword, options);
    }

    // Return the default error message
    defaultMessage(): string {
        return this.errorMessage;
    }

    checkBlacklist(
        password: string,
        options: BlacklistRule | undefined
    ): boolean {
        if (options?.enabled) {
            const blacklist = options.values ?? this.defaultBlacklistValues;
            if (blacklist.includes(password)) {
                this.errorMessage = options.message!;
                return false;
            }
        }
        return true;
    }

    checkLength(password: string, options: LengthRule | undefined): boolean {
        if (options?.enabled && password.length < options.length!) {
            this.errorMessage = options.message!;
            return false;
        }

        if (options?.enabled && password.length > options.length!) {
            this.errorMessage = options.message!;
            return false;
        }

        return true;
    }

    checkRegex(
        password: string,
        rule: HasRule | undefined,
        regex: RegExp
    ): boolean {
        if (rule?.enabled && !regex.test(password)) {
            this.errorMessage = rule.message!;
            return false;
        }
        return true;
    }

    checkSpecialChars(
        password: string,
        options: HasSpecialCharsRule | undefined
    ): boolean {
        if (options?.enabled) {
            const chars = options?.characters ?? this.defaultSpecialChars;
            const regex = new RegExp(`[${chars.join("")}]`, "g");
            if (!regex.test(password)) {
                this.errorMessage = options.message!;
                return false;
            }
        }
        return true;
    }

    checkConfirmPassword(
        password: string,
        confirmPassword: string | undefined,
        options: ConfirmPasswordRule | undefined
    ): boolean {
        if (options?.enabled && confirmPassword !== password) {
            this.errorMessage = options.message!;
            return false;
        }
        return true;
    }

    private mergeWithDefaults(
        userOptions: PasswordValidatorOptions
    ): PasswordValidatorOptions {
        return {
            blacklist: {
                enabled:
                    userOptions?.blacklist?.enabled ??
                    this.defaultOptions.blacklist.enabled,
                values:
                    userOptions?.blacklist?.values ??
                    this.defaultOptions.blacklist.values,
                message:
                    userOptions?.blacklist?.message ??
                    this.defaultMessages.blacklist,
            },
            hasLowerCase: {
                enabled:
                    userOptions?.hasLowerCase?.enabled ??
                    this.defaultOptions.hasLowerCase.enabled,
                message:
                    userOptions?.hasLowerCase?.message ??
                    this.defaultMessages.hasLowerCase,
            },
            hasNumbers: {
                enabled:
                    userOptions?.hasNumbers?.enabled ??
                    this.defaultOptions.hasNumbers.enabled,
                message:
                    userOptions?.hasNumbers?.message ??
                    this.defaultMessages.hasNumbers,
            },
            hasSpecialChars: {
                enabled:
                    userOptions?.hasSpecialChars?.enabled ??
                    this.defaultOptions.hasSpecialChars.enabled,
                characters:
                    userOptions?.hasSpecialChars?.characters ??
                    this.defaultOptions.hasSpecialChars.characters,
                message:
                    userOptions?.hasSpecialChars?.message ??
                    this.defaultMessages.hasSpecialChars,
            },
            hasUpperCase: {
                enabled:
                    userOptions?.hasUpperCase?.enabled ??
                    this.defaultOptions.hasUpperCase.enabled,
                message:
                    userOptions?.hasUpperCase?.message ??
                    this.defaultMessages.hasUpperCase,
            },
            minLength: {
                enabled:
                    userOptions?.minLength?.enabled ??
                    this.defaultOptions.minLength.enabled,
                length:
                    userOptions?.minLength?.length ??
                    this.defaultOptions.minLength.length,
                message:
                    userOptions?.minLength?.message ??
                    this.defaultMessages.minLength,
            },
            maxLength: {
                enabled:
                    userOptions?.maxLength?.enabled ??
                    this.defaultOptions.maxLength.enabled,
                length:
                    userOptions?.maxLength?.length ??
                    this.defaultOptions.maxLength.length,
                message:
                    userOptions?.maxLength?.message ??
                    this.defaultMessages.maxLength,
            },
            confirmPassword: {
                enabled:
                    userOptions?.confirmPassword?.enabled ??
                    this.defaultOptions.confirmPassword.enabled,
                message:
                    userOptions?.confirmPassword?.message ??
                    this.defaultMessages.confirmPassword,
                compareToProperty:
                    userOptions?.confirmPassword?.compareToProperty ??
                    this.defaultOptions.confirmPassword.compareToProperty,
            },
        };
    }

    private validatePassword(
        password: string,
        confirmPassword: string | undefined,
        options: PasswordValidatorOptions
    ): boolean {
        const checks = [
            this.checkBlacklist(password, options?.blacklist),
            this.checkLength(password, options?.minLength),
            this.checkRegex(password, options?.hasUpperCase, /[A-Z]/g),
            this.checkRegex(password, options?.hasLowerCase, /[a-z]/g),
            this.checkRegex(password, options?.hasNumbers, /\d/g),
            this.checkSpecialChars(password, options?.hasSpecialChars),
            this.checkConfirmPassword(
                password,
                confirmPassword,
                options?.confirmPassword
            ),
        ];

        return checks.every((result) => result);
    }
}
