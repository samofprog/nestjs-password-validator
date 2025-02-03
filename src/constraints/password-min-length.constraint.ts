import { ValidationArguments, ValidatorConstraint } from "class-validator";
import { PasswordConstraint } from "./password.constraint";
import { OptionsLengthRule } from "../password-validator-options.interface";

@ValidatorConstraint({ async: true })
export class PasswordMinLengthConstraint extends PasswordConstraint {
    defaultMessage(): string {
        return this.defaultMessages.minLength;
    }

    validate(
        value: string,
        args: ValidationArguments
    ): Promise<boolean> | boolean {
        let options = args.constraints?.[0] as OptionsLengthRule;
        options = options ?? { length: 8 };
        return value.length >= options.length!;
    }
}
