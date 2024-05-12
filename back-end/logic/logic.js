export const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const sortDataAscending = (data, columnsort) => {
    return data.sort((a, b) => (a[columnsort] < b[columnsort]) ? -1 : (a[columnsort] > b[columnsort]) ? 1 : 0);
};

export const sortDataDescending = (data, columnsort) => {
    return data.sort((a, b) => (a[columnsort] > b[columnsort]) ? -1 : (a[columnsort] < b[columnsort]) ? 1 : 0);
};

export const convertDateFormatToVN = (type, dateString) => {
    const date = new Date(dateString);
    if (type === "year") {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    if (type === "time") {
        const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        return formattedTime;
    }
};

export const sortData = (data, columnsort, typesort) => {
    let avalue, bvalue;
    return data.sort((a, b) => {
        switch (columnsort) {
            case 'id':
                avalue = a.id;
                bvalue = b.id;
                break;
            case 'createdAt':
                avalue = a.createdAt;
                bvalue = b.createdAt;
                break;
            case 'temperature':
                avalue = a.temperature;
                bvalue = b.temperature;
                break;
            case 'humidity':
                avalue = a.humidity;
                bvalue = b.humidity;
                break;
            case 'light':
                avalue = a.light;
                bvalue = b.light;
                break;
            default:
                break;
        }
        if (typesort === 'ASC') {
            return avalue - bvalue;
        }
        return bvalue - avalue;
    });
};