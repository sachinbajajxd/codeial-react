export * from './constants';

// localStorage.setItem(1, 2);

export const setItemInLocalStorage = (key, value) => {

    if(!key || !value){
        return console.error('Can not store in LS');
    }

        const valueToStore = typeof value != 'string' ? JSON.stringify(value) : value;
        

        localStorage.setItem(key, valueToStore);
}

export const removeItemFromLocalStorage = (key) => {

    if(!key){
        return console.error('Can not delete from LS');
    }
        

        localStorage.removeItem(key);
}

export const getItemFromLocalStorage = (key) => {

    if(!key){
        return console.error('Can not get the value in LS');
    }

    return localStorage.getItem(key);
}

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=aakash&password=123213'
};
