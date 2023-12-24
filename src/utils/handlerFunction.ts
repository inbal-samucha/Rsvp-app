export const convertObjToLowerCase =  (obj: Record<string, unknown>) => {

    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'string') {
            obj[key] = (obj[key] as string).toLowerCase();
        }
    });

    return obj
}