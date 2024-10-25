export const createNewDate = (isoString) => {
    const date = new Date(isoString);

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    return date.toLocaleString('ru-RU', options).replace(',', '');
};