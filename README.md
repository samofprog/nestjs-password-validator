# Password Validator for NestJS

A customizable password validation library for NestJS with support for custom rules, blacklist, and optional password confirmation.

---

![CI](https://img.shields.io/badge/CI-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-84%25-yellow)
![NPM Version](https://img.shields.io/npm/v/@samofprog/nestjs-password-validator)
![Install Size](https://img.shields.io/bundlephobia/min/@samofprog/nestjs-password-validator)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## Features 🎯

| Feature                       | Description                                                                        |
|-------------------------------|------------------------------------------------------------------------------------|
| **Length Validation** 🔢      | Enforce minimum and maximum password length.                                       |
| **Blacklist Support** 🚫      | Prevent the use of specific blacklisted passwords.                                 |
| **Uppercase Check** 🔠        | Ensure passwords contain at least one uppercase letter.                            |
| **Lowercase Check** 🔡        | Ensure passwords contain at least one lowercase letter.                            |
| **Number Check** 🔢           | Ensure passwords contain at least one number.                                      |
| **Special Character Check** ✨ | Ensure passwords include special characters, with customizable allowed characters. |
| **Confirm Password** 🔒       | Validate password confirmation against a separate field.                           |

---

## Installation ⚙️

```bash
npm install @samofprog/nestjs-password-validator
# or
yarn add @samofprog/nestjs-password-validator
```

---

## Usage 📚

### Basic Usage with `@IsPassword`

```typescript
import { IsPassword } from '@samofprog/nestjs-password-validator';

class CreateUserDto {
  @IsPassword({
    minLength: { enabled: true, length: 8 },
    hasUpperCase: { enabled: true },
    hasLowerCase: { enabled: true },
    hasNumbers: { enabled: true },
    hasSpecialChars: { enabled: true },
    blacklist: { enabled: true, values: ['password', '12345678'] },
  })
  password: string;
}

// or

class CreateUserDto {
  @IsPassword()
  password: string;
}
```

### Basic Usage with Individual Decorators

```typescript
import {
  PasswordMinLength,
  PasswordMaxLength,
  PasswordHasUpperCase,
  PasswordHasLowerCase,
  PasswordHasNumbers,
  PasswordHasSpecialChars,
  PasswordBlacklist,
  ConfirmPassword,
} from '@samofprog/nestjs-password-validator';

class CreateUserDto {
  @PasswordMinLength({length:8})
  @PasswordMaxLength({length:15})
  @PasswordHasUpperCase()
  @PasswordHasLowerCase()
  @PasswordHasNumbers()
  @PasswordHasSpecialChars()
  @PasswordBlacklist({values:['password', '12345678']})
  password: string;
}
```

### Confirm Password Example

```typescript
class RegisterDto {
  @PasswordMinLength(8)
  @ConfirmPassword({ compareToProperty: 'confirmPassword' })
  password: string;

  confirmPassword: string;
}
```

---

## Configuration Options ⚡️

| Option                      | Type    | Description                                              |
|-----------------------------|---------|----------------------------------------------------------|
| **PasswordMinLength**       | `objet` | Minimum password length.                                 |
| **PasswordMaxLength**       | `objet` | Maximum password length.                                 |
| **PasswordHasUpperCase**    | `objet` | Check for at least one uppercase letter.                 |
| **PasswordHasLowerCase**    | `objet` | Check for at least one lowercase letter.                 |
| **PasswordHasNumbers**      | `objet` | Check for at least one number.                           |
| **PasswordHasSpecialChars** | `objet` | Check for at least one special character.                |
| **PasswordBlacklist**       | `objet` | Disallow specific blacklisted passwords.                 |
| **ConfirmPassword**         | `objet` | Validate that the password matches a confirmation field. |

---

## Example Validation Messages 🔔

| Rule                   | Default Message                                       |
|------------------------|-------------------------------------------------------|
| **Blacklist**          | Password is blacklisted.                              |
| **Uppercase**          | Password must have at least one uppercase letter.     |
| **Lowercase**          | Password must have at least one lowercase letter.     |
| **Numbers**            | Password must have at least one number.               |
| **Special Characters** | Password must include at least one special character. |
| **Min Length**         | Password is too short.                                |
| **Max Length**         | Password is too long.                                 |
| **Confirm Password**   | Passwords do not match.                               |

---

## License 📄

This project is licensed under the MIT License. See the LICENSE file for details.

