// Попрацюємо з числовим паліндромом.Числовий паліндром — це натуральне число, яке читається зліва направо і справа наліво однаково.Інакше кажучи, відрізняється симетрією запису(розташування цифр), причому число знаків може бути як парним, так і непарним.Але.Паліндром можна отримати як результат операцій над іншими числами.Візьмемо будь - яке натуральне число і складемо його зі зворотним числом, тобто записаним тими самими цифрами, але у зворотному порядку.Проробимо ту саму дію з сумою, що вийшла, і будемо повторювати її доти, доки не утвориться паліндром.Іноді достатньо зробити всього один крок(наприклад, 312 + 213 = 525), але, як правило, потрібно не менше двох.Скажімо, число 96 породжує паліндром 4884 тільки на четвертому кроці.... Вам потрібно написати функцію, яка повертатиме об'єкт, де буде властивістьresultі це буде паліндром, і властивістьsteps— це число викликів до знаходження паліндрома. Для того, щоб перевірити себе використовуйте число 196. Це так зване Lychrel number — число яке немає поліндрому

interface IPalindrom {
  result: number | null;
  step: number | null;
}

function isPalindrom(number: string): boolean {
  for (let index = 0; index < number.length / 2; index++) {
    if (number[index] !== number[number.length - 1 - index]) {
      return false;
    }
  }
  return true;
}

function getPalindrom(number: number, step = 1): IPalindrom {
  if (number === 196) return { result: null, step: null };

  const reverseNumber = +String(number).split('').reverse().join('');
  const sum = number + reverseNumber;
  return isPalindrom(String(sum)) ? { result: sum, step: step } : getPalindrom(sum, ++step);
}

getPalindrom(96);
getPalindrom(312);
getPalindrom(54);
getPalindrom(45454554);
getPalindrom(196);

// Напишіть функцію, яка приймає масив унікальних елементів і генерує всі можливі перестановки цього масиву.Використовуйте рекурсію для знаходження всіх перестановок.Наприклад, якщо вхідний масив[1, 2, 3], функція має повернути масив, що містить[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2]і[3, 2, 1].

function uniqueGenerator(inputArr: number[]): number[][] {
  const result: number[][] = [];

  function generate(workingArray: number[], generatedArray: number[] = []): void {
    workingArray.length === 0 && result.push(generatedArray);

    workingArray.map((item, index) => {
      const newWorkingArray = [...workingArray.slice(0, index), ...workingArray.slice(index + 1)];
      const newGeneratesArray = [...generatedArray, item];

      generate(newWorkingArray, newGeneratesArray);
    });
  }

  generate(inputArr);

  return result;
}

uniqueGenerator([1, 2, 3]);
