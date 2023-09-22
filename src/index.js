// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами).
var CheckKeysAreStrings = /** @class */ (function () {
    function CheckKeysAreStrings() {
    }
    return CheckKeysAreStrings;
}());
function isKeysAreStrings(obj) {
    return obj instanceof CheckKeysAreStrings;
}
var obj = {
    name: 'Olha',
    surname: 'Kabatska',
    age: 30,
};
function checkKeys(obj) {
    if (isKeysAreStrings(obj)) {
        return 'All keys are strings';
    }
    return 'All keys are unknown ';
}
console.log(checkKeys(obj));
