import { ValidationArguments, ValidatorConstraint } from "class-validator";
import { PasswordConstraint } from "./password.constraint";
import { OptionsHasSpecialCharsRule } from "../password-validator-options.interface";

@ValidatorConstraint({ async: true })
export class PasswordHasSpecialCharsConstraint extends PasswordConstraint {
    defaultMessage(): string {
        return this.defaultMessages.hasSpecialChars;
    }

    validate(
        value: string,
        args: ValidationArguments
    ): Promise<boolean> | boolean {
        const options = args.constraints?.[0] as OptionsHasSpecialCharsRule;
        const specialChars = options?.characters ?? this.defaultSpecialChars;
        return this.checkSpecialChars(value, {
            enabled: true,
            characters: specialChars,
            message: this.defaultMessage(),
        });
    }
}
