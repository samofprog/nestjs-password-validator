## Changelog 📝

### v1.1.0

### Added

- **Refactor:** Introduced independent decorators for each validation rule.
- **New Decorators:**
  - `@PasswordMinLength({message:string, length:number})`
  - `@PasswordMaxLength({message:string, length:number})`
  - `@PasswordHasUppercase({message:string})`
  - `@PasswordHasLowercase({message:string})`
  - `@PasswordHasNumbers({message:string})`
  - `@PasswordHasSpecialChars({message:string, characters:string[]})`
  - `@PasswordBlacklist({message:string, values:string[]})`
  - `@ConfirmPassword({message:string, compareToProperty:string})`
- **Preserved `@IsPassword` decorator:** Users can still opt for a single decorator with all configurations.
- **Documentation Update:** Updated examples and configuration details for the new decorators.

---

### v1.0.0

### Added

- Initial release 🚀
- Supports customizable password rules:
  - Length validation (min/max).
  - Uppercase, lowercase, number, and special character checks.
  - Blacklist feature.
  - Password confirmation validation.

---

