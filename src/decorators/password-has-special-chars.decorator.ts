import { registerDecorator } from "class-validator";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";
import { PasswordHasSpecialCharsConstraint } from "../constraints/password-has-special-chars.constraint";
import { OptionsHasSpecialCharsRule } from "../password-validator-options.interface";

export function PasswordHasSpecialChars(
    validatorOptions?: OptionsHasSpecialCharsRule,
    defaultValidatorOptions?: ValidationOptions
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [validatorOptions],
            options: defaultValidatorOptions,
            validator: PasswordHasSpecialCharsConstraint,
        });
    };
}
