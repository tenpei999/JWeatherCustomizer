// import {
//   isValidColor,
//   isValidBorderStyle,
//   isValidBorderWidth,
//   isValidBorder,
// } from '../functions/useBorderControl'; // バリデーション関数が定義されているファイルへのパスを正しく指定してください

describe('Validation Functions', () => {
  test('isValidColor should return true for valid colors', () => {
    expect(isValidColor('#FF0000')).toBe(true);
    expect(isValidColor('#123456')).toBe(true);
  });

  test('isValidColor should return false for invalid colors', () => {
    expect(isValidColor('red')).toBe(false);
    expect(isValidColor('#12345')).toBe(false);
  });

  test('isValidBorderStyle should return true for valid styles', () => {
    expect(isValidBorderStyle('solid')).toBe(true);
    expect(isValidBorderStyle('dashed')).toBe(true);
    expect(isValidBorderStyle('dotted')).toBe(true);
  });

  test('isValidBorderStyle should return false for invalid styles', () => {
    expect(isValidBorderStyle('double')).toBe(false);
    expect(isValidBorderStyle('none')).toBe(false);
  });

  test('isValidBorderWidth should return true for valid widths', () => {
    expect(isValidBorderWidth('2px')).toBe(true);
    expect(isValidBorderWidth('3.5%')).toBe(true);
  });

  test('isValidBorderWidth should return false for invalid widths', () => {
    expect(isValidBorderWidth('2')).toBe(false);
    expect(isValidBorderWidth('2.5')).toBe(false);
    expect(isValidBorderWidth('px')).toBe(false);
  });

  test('isValidBorder should return true for valid borders', () => {
    const validBorder = {
      color: '#FF0000',
      style: 'solid',
      width: '2px',
    };
    expect(isValidBorder(validBorder)).toBe(true);
  });

  test('isValidBorder should return false for invalid borders', () => {
    const invalidBorder = {
      color: 'red',
      style: 'double',
      width: '2.5',
    };
    expect(isValidBorder(invalidBorder)).toBe(false);
  });
});
