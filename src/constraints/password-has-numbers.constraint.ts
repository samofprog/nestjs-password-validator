import { ValidatorConstraint } from "class-validator";
import { PasswordConstraint } from "./password.constraint";

@ValidatorConstraint({ async: true })
export class PasswordHasNumbersConstraint extends PasswordConstraint {
    defaultMessage(): string {
        return this.defaultMessages.hasNumbers;
    }

    validate(value: string): Promise<boolean> | boolean {
        return this.checkRegex(
            value,
            {
                enabled: true,
                message: this.defaultMessage(),
            },
            /\d/g
        );
    }
}
