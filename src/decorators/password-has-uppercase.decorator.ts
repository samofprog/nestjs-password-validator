import { registerDecorator } from "class-validator";
import { ValidationOptions } from "class-validator/types/decorator/ValidationOptions";
import { PasswordHasUppercaseConstraint } from "../constraints/password-has-uppercase.constraint";

export function PasswordHasUppercase(validatorOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validatorOptions,
            validator: PasswordHasUppercaseConstraint,
        });
    };
}
