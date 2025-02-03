import { registerDecorator } from "class-validator";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";
import { PasswordHasNumbersConstraint } from "../constraints/password-has-numbers.constraint";

export function PasswordHasNumbers(validatorOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validatorOptions,
            validator: PasswordHasNumbersConstraint,
        });
    };
}
