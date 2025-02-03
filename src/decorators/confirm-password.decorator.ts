import { registerDecorator } from "class-validator";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";
import { OptionsConfirmPasswordRule } from "../password-validator-options.interface";
import { ConfirmPasswordConstraint } from "../constraints/confirm-password.constraint";

export function ConfirmPassword(
    validatorOptions: OptionsConfirmPasswordRule,
    defaultValidatorOptions?: ValidationOptions
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: defaultValidatorOptions,
            constraints: [validatorOptions],
            validator: ConfirmPasswordConstraint,
        });
    };
}
