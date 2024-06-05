const  isValidUEN  = require('../src/shared/isValidUEN');


describe('isValidUEN', () => {

    test('Valid UEN with pattern1', () => {
        expect(isValidUEN('12345678A')).toBe(true);
    });

    test('Valid UEN with pattern2 and valid year', () => {
        expect(isValidUEN('202312345A')).toBe(true);
    });

    test('Invalid UEN with pattern2 and invalid year', () => {
        expect(isValidUEN('202512345A')).toBe(false);
    });

    test('Valid UEN with pattern3, T year part within range', () => {
        expect(isValidUEN('T24LL0001A')).toBe(true);
    });

    test('Invalid UEN with pattern3, T year part out of range', () => {
        expect(isValidUEN('T25LL0001A')).toBe(false);
    });

    test('Valid UEN with pattern3, S and R prefix', () => {
        expect(isValidUEN('S99LL0001A')).toBe(true);
        expect(isValidUEN('R00LL0001A')).toBe(true);
    });

    test('Invalid UEN format', () => {
        expect(isValidUEN('A2345678B')).toBe(false);
        expect(isValidUEN('1234567A')).toBe(false);
    });

    test('Invalid UEN with wrong pattern3 prefix', () => {
        expect(isValidUEN('X25LL0001A')).toBe(false);
    });

});