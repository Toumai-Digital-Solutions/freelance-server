export const generateId = ({
  starter,
  min = 100000,
  max = 900000,
}: {
  starter?: string;
  min?: number;
  max?: number;
}): string => {
  const end = Math.floor(min + Math.random() * max).toString();
  return starter ? starter + end : end;
};

export function generatePassword(): string {
  const symbols = '!@#$%^&*()_+=-<>?';

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomSymbol = () => {
    const index = getRandomInt(0, symbols.length - 1);
    return symbols[index];
  };

  const getRandomCharacter = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const index = getRandomInt(0, characters.length - 1);
    return characters[index];
  };

  const getRandomDigit = () => {
    return getRandomInt(0, 9).toString();
  };

  const length = Math.random() < 0.5 ? 8 : 10;
  let numSymbols = getRandomInt(1, 2);

  let password = '';
  let hasUppercase = false;

  for (let i = 0; i < length; i++) {
    if (i === length - 1 && numSymbols > 0) {
      // Add symbol at the end if symbols are required
      password += getRandomSymbol();
    } else {
      // Randomly select digit, lowercase letter, or symbol
      const choice = getRandomInt(1, 3);
      if (choice === 1) {
        password += getRandomDigit();
      } else if (choice === 2) {
        const character = getRandomCharacter();
        password += character.toLowerCase();
        // Track if there's at least one uppercase letter
        if (!hasUppercase) {
          password =
            password.slice(0, i) +
            character.toUpperCase() +
            password.slice(i + 1);
          hasUppercase = true;
        }
      } else {
        if (numSymbols > 0) {
          password += getRandomSymbol();
          numSymbols--;
        } else {
          // If symbols are not required, select a lowercase letter instead
          const character = getRandomCharacter();
          password += character.toLowerCase();
          // Track if there's at least one uppercase letter
          if (!hasUppercase) {
            password =
              password.slice(0, i) +
              character.toUpperCase() +
              password.slice(i + 1);
            hasUppercase = true;
          }
        }
      }
    }
  }

  return password;
}
