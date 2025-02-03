import { registerDecorator } from "class-validator";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";
import { OptionsLengthRule } from "../password-validator-options.interface";
import { PasswordMaxLengthConstraint } from "../constraints/password-max-length.constraint";

export function PasswordMaxLength(
    validatorOptions?: OptionsLengthRule,
    defaultValidatorOptions?: ValidationOptions
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: defaultValidatorOptions,
            constraints: [validatorOptions],
            validator: PasswordMaxLengthConstraint,
        });
    };
}
