import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { PasswordValidatorOptions } from "./password-validator-options.interface";

@ValidatorConstraint({ async: true })
export class PasswordConstraint implements ValidatorConstraintInterface {
    private errorMessage = "Password is invalid";
    private readonly defaultSpecialChars = [
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

    private readonly defaultBlacklistValues = ["12345678", "password"];

    private readonly defaultMessages = {
        blacklist: "Password is blacklisted",
        hasLowerCase: "Password must have at least one lowercase letter",
        hasNumbers: "Password must have at least one number",
        hasSpecialChars: "Password must have at least one special character",
        hasUpperCase: "Password must have at least one uppercase letter",
        minLength: "Password is too short",
        maxLength: "Password is too long",
        confirmPassword: "Passwords do not match",
    };

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
        },
    };

    // Validate the password based on provided options or defaults
    validate(value: string, args: ValidationArguments): boolean {
        const options: PasswordValidatorOptions = this.mergeWithDefaults(
            args.constraints[0] ?? {}
        );

        const obj = args.object as Record<string, any>;
        const confirmPassword = options.confirmPassword?.enabled
            ? obj[
                  options.confirmPassword.compareToProperty ?? "confirmPassword"
              ]
            : undefined;

        return this.validatePassword(value, confirmPassword, options);
    }

    // Return the default error message
    defaultMessage(): string {
        return this.errorMessage;
    }

    /**
     * Merge user-provided options with the default options.
     * Ensures that default messages are used when no custom message is provided.
     *
     * @param userOptions The options provided by the user.
     * @returns Merged options with default values for undefined properties.
     */
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
            },
        };
    }
    /**
     * Perform all password validations.
     *
     * @param password The password to validate.
     * @param confirmPassword The password confirmation value (if applicable).
     * @param options The validation options to apply.
     * @returns True if the password passes all validations; otherwise, false.
     */
    private validatePassword(
        password: string,
        confirmPassword: string | undefined,
        options: PasswordValidatorOptions
    ): boolean {
        const checks = [
            this.checkBlacklist(password, options),
            this.checkLength(password, options),
            this.checkRegex(password, options.hasUpperCase, /[A-Z]/g),
            this.checkRegex(password, options.hasLowerCase, /[a-z]/g),
            this.checkRegex(password, options.hasNumbers, /\d/g),
            this.checkSpecialChars(password, options),
            this.checkConfirmPassword(password, confirmPassword, options),
        ];

        // Return true only if all validations pass
        return checks.every((result) => result);
    }

    // Validation functions remain unchanged but include comments for clarity

    /**
     * Validate if the password is not in the blacklist.
     */
    private checkBlacklist(
        password: string,
        options: PasswordValidatorOptions
    ): boolean {
        if (options.blacklist?.enabled) {
            const blacklist =
                options.blacklist.values ?? this.defaultBlacklistValues;
            if (blacklist.includes(password)) {
                this.errorMessage = options.blacklist.message!;
                return false;
            }
        }
        return true;
    }

    /**
     * Validate the password length (min and max).
     */
    private checkLength(
        password: string,
        options: PasswordValidatorOptions
    ): boolean {
        if (
            options.minLength?.enabled &&
            password.length < options.minLength.length!
        ) {
            this.errorMessage = options.minLength.message!;
            return false;
        }

        if (
            options.maxLength?.enabled &&
            password.length > options.maxLength.length!
        ) {
            this.errorMessage = options.maxLength.message!;
            return false;
        }

        return true;
    }

    /**
     * Validate if the password matches a specific regex.
     */
    private checkRegex(
        password: string,
        rule: { enabled?: boolean; message?: string } | undefined,
        regex: RegExp
    ): boolean {
        if (rule?.enabled && !regex.test(password)) {
            this.errorMessage = rule.message!;
            return false;
        }
        return true;
    }

    /**
     * Validate if the password contains special characters.
     */
    private checkSpecialChars(
        password: string,
        options: PasswordValidatorOptions
    ): boolean {
        if (options.hasSpecialChars?.enabled) {
            const chars =
                options.hasSpecialChars.characters ?? this.defaultSpecialChars;
            const regex = new RegExp(`[${chars.join("")}]`, "g");
            if (!regex.test(password)) {
                this.errorMessage = options.hasSpecialChars.message!;
                return false;
            }
        }
        return true;
    }

    /**
     * Validate if the confirmation password matches the password.
     */
    private checkConfirmPassword(
        password: string,
        confirmPassword: string | undefined,
        options: PasswordValidatorOptions
    ): boolean {
        if (options.confirmPassword?.enabled && confirmPassword !== password) {
            this.errorMessage = options.confirmPassword.message!;
            return false;
        }
        return true;
    }
}
