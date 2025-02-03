import { registerDecorator } from "class-validator";
import { OptionsBlacklistRule } from "../password-validator-options.interface";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";
import { PasswordBlacklistConstraint } from "../constraints/password-blacklist.constraint";

export function PasswordBlacklist(
    validatorOptions?: OptionsBlacklistRule,
    defaultValidatorOptions?: ValidationOptions
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: defaultValidatorOptions,
            constraints: [validatorOptions],
            validator: PasswordBlacklistConstraint,
        });
    };
}
