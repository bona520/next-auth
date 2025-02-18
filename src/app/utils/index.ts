const khmerNumbers = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];

export function ConvertToKhmerNumber(num: number) {
    return num?.toString().split('').map(n => khmerNumbers[parseInt(n)]).join('');
}

export function DisplayLanguage(lang: string) {
    switch (lang) {
        case 'km':
            return 'ខ្មែរ';
        case 'en':
            return 'EN';
        case 'zh':
            return '中文';
        default:
            return 'ខ្មែរ';
    }
}

export function ValidatePassword(password: string): { isValid: boolean, errors: { [key: string]: boolean } } {
    const errors = {
        length: false,
        number: false,
        uppercase: false,
    };

    if (password.length < 8) {
        errors.length = true;
    }
    if (!/[A-Z]/.test(password)) {
        errors.uppercase = true;
    }
    if (!/[0-9]/.test(password)) {
        errors.number = true;
    }


    const isValid = !(errors.length || errors.number || errors.uppercase);
    return { isValid, errors };
}

export function getFileName(fileName: string) {
    return `${process.env.NEXT_PUBLIC_IMG_URL}/${fileName}`;
}


export function validateHttpUrl(url: string) {
    // help has https:// or http:// return true
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}