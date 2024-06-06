const isValidUEN = (uen) => {

    const pattern1 = /^[0-9]{8}[A-Z]$/;
    const pattern2 = /^[0-9]{4}[0-9]{5}[A-Z]$/;
    const pattern3 = /^[TSR][0-9]{2}[A-Z][0-9A-Z][0-9]{4}[A-Z]$/;

    if (pattern1.test(uen)) {
        return true;
    } else if (pattern2.test(uen)) {
        const year = parseInt(uen.substring(0, 4), 10);
        // The issuance year cannot be more than this year (2024)
        return year <= 2024;
    } else if (pattern3.test(uen)) {
        if (uen.charAt(0) === 'T') {
            // The issuance year cannot be more than this year (2024)
            const yearPart = parseInt(uen.substring(1, 3), 10);
            return yearPart <= 24;
        }
        return true
    } else {
        return false;
    }
};

module.exports = isValidUEN;
