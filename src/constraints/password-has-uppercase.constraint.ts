import { ValidatorConstraint } from "class-validator";
import { PasswordConstraint } from "./password.constraint";

@ValidatorConstraint({ async: true })
export class PasswordHasUppercaseConstraint extends PasswordConstraint {
    defaultMessage(): string {
        return this.defaultMessages.hasUpperCase;
    }

    validate(value: string): Promise<boolean> | boolean {
        return this.checkRegex(
            value,
            {
                enabled: true,
                message: this.defaultMessage(),
            },
            /[a-z]/g
        );
    }
}
