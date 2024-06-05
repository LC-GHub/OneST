const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}`;
    return formattedDate;
};


module.exports = formatDateTime