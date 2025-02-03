import { registerDecorator } from "class-validator";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";
import { OptionsLengthRule } from "../password-validator-options.interface";
import { PasswordMinLengthConstraint } from "../constraints/password-min-length.constraint";

export function PasswordMinLength(
    validatorOptions?: OptionsLengthRule,
    defaultValidatorOptions?: ValidationOptions
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: defaultValidatorOptions,
            constraints: [validatorOptions],
            validator: PasswordMinLengthConstraint,
        });
    };
}
