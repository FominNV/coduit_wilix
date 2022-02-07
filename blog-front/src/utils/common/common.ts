export const getToken = (): string | null => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + 'jwtToken'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : null;
};

// парсим тело ответа, если что-то пошло не так
// пример тела: {"errors":{"email":["has already been taken"],"username":["has already been taken"]}}

export function parseError(error: any): string[] {
  const objError = error['errors'];
  const result: string[] = [];

  // почему-то сервер возвращает ошибки в странном формате, иногда это массив, иногда просто строка,
  // поэтому делаем ветвление
  for (const key in objError) {
    if (typeof objError[key] === 'object') {
      result.push(key + ' ' + objError[key][0]);
    } else {
      result.push(key + ' ' + objError[key]);
    }
  }
  return result;
}

export function setCookie(name: string, value: string, options?: { [key: string]: string }) {
  options = {
    path: '/',
    ...options,
  };

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (const optionKey in options) {
    if (options) {
      updatedCookie += '; ' + optionKey;
      const optionValue = options[optionKey];
      if (optionValue) {
        updatedCookie += '=' + optionValue;
      }
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie() {
  setCookie('jwtToken', '', {
    'max-age': '-1',
  });
}

export const dateFormat = (unformatDate: string): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(unformatDate);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
