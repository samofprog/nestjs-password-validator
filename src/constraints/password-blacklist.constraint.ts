import { ValidationArguments, ValidatorConstraint } from "class-validator";
import { PasswordConstraint } from "./password.constraint";
import { OptionsBlacklistRule } from "../password-validator-options.interface";

@ValidatorConstraint({ async: true })
export class PasswordBlacklistConstraint extends PasswordConstraint {
    defaultMessage(): string {
        return this.defaultMessages.blacklist;
    }

    validate(
        value: string,
        args: ValidationArguments
    ): Promise<boolean> | boolean {
        const options = args.constraints?.[0] as OptionsBlacklistRule;
        const blacklist = options?.values ?? this.defaultBlacklistValues;
        return this.checkBlacklist(value, {
            enabled: true,
            values: blacklist,
            message: this.defaultMessage(),
        });
    }
}
