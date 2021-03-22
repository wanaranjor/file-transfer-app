export const isNumber = (val) => !isNaN(val) && val > 0;

export const isEmpty = (val) => val !== undefined && val !== null && val.trim().length !== 0;

export const isNotZero = (val) => val > 0;

export const isZero = (val) => val === 0;

export const isObject = (val) => Object.prototype.toString.call(val) === "[object Object]";

export const isBoolean = (val) => 'boolean' === typeof val;

export const isValidEmail = (val) =>
  new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  ).test(val);

export const isEqualPassword = (password, conPassword) => (isEmpty(password) && isEmpty(conPassword) && password === conPassword) ? true : false

export const slugify = (text) => {
  return text
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

export const replaceSpaces = (text) => {
  return text
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize("NFD") // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, "%") // Replace spaces with %
}