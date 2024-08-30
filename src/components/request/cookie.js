export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([$?*|{}\]\\^])/g, '\\$1') + "=([^;]*)"
    ))
    
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, options = {}) {
    console.log(name,value, options)
    options = {
        path: '/',
        /*
        domain: 'axiuraleocephala.ru', // Доступ к куки только с указанного домена
        secure: true, // Передавать только по HTTPS
        httpOnly: true, // Запрещает доступ к куки через JS
        SameSite: "strict", // Отправлять куки только с указанного домена
        */
       samesite: "None",
       secure,
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updateCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updateCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updateCookie += "=" + optionValue;
        }
    }
    console.log(updateCookie);
    console.log(document);
    console.log(document.cookie);
    document.cookie = updateCookie;
    console.log(document.cookie);
    
}

export function deleteCookie(name) {
    setCookie(name, "", {'max-age': -1})
}