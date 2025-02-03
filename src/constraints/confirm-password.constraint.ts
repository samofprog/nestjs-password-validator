import { ValidationArguments, ValidatorConstraint } from "class-validator";
import { PasswordConstraint } from "./password.constraint";
import { OptionsConfirmPasswordRule } from "../password-validator-options.interface";

@ValidatorConstraint({ async: true })
export class ConfirmPasswordConstraint extends PasswordConstraint {
    defaultMessage(): string {
        return this.defaultMessages.confirmPassword;
    }

    validate(
        value: string,
        args: ValidationArguments
    ): Promise<boolean> | boolean {
        const options = args.constraints?.[0] as OptionsConfirmPasswordRule;
        const obj = args.object as Record<string, any>;
        if (!options?.compareToProperty) {
            throw Error("compareToProperty must be defined");
        }
        const confirmPassword = obj[options.compareToProperty];
        return this.checkConfirmPassword(value, confirmPassword, {
            enabled: true,
            message: this.defaultMessage(),
            compareToProperty: options.compareToProperty,
        });
    }
}
