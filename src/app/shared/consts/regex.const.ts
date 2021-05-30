interface Regex {
  name: RegExp;
  email: RegExp;
  password: RegExp;
}

export const REGEX: Regex = {
  name: /^[A-Za-z][A-Za-z ]{2,17}$/,
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  password: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
};
