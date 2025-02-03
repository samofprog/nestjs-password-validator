import { registerDecorator } from "class-validator";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";
import { PasswordHasLowercaseConstraint } from "../constraints/password-has-lowercase.constraint";

export function PasswordHasLowercase(validatorOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validatorOptions,
            validator: PasswordHasLowercaseConstraint,
        });
    };
}
