import { registerDecorator } from "class-validator";
import { PasswordConstraint } from "../constraints/password.constraint";
import { PasswordValidatorOptions } from "../password-validator-options.interface";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";

export function IsPassword(
    validatorOptions?: PasswordValidatorOptions,
    defaultValidatorOptions?: ValidationOptions
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: defaultValidatorOptions,
            constraints: [validatorOptions],
            validator: PasswordConstraint,
        });
    };
}
