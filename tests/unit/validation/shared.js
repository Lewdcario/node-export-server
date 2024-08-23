import { describe, expect, it } from '@jest/globals';

import { validatePropOfSchema } from '../../utils/tests_utils';

/**
 * Properties of config validators and parsers tests
 */
export const configTests = (schema, strictCheck) => {
  const noPropertyToUndefined = (property) => {
    const obj = {};
    expect(schema.parse(obj)[property]).toBe(undefined);
  };

  const acceptUndefined = (property) => {
    const obj = { [property]: undefined };
    expect(schema.parse(obj)[property]).toBe(undefined);
  };

  const acceptNull = (property) => {
    const obj = { [property]: null };
    expect(schema.parse(obj)[property]).toBe(null);
  };

  const stringNullToNull = (property) => {
    const obj = { [property]: 'null' };
    expect(schema.parse(obj)[property]).toBe(null);
  };

  const stringUndefinedToNull = (property) => {
    const obj = { [property]: 'undefined' };
    expect(schema.parse(obj)[property]).toBe(null);
  };

  const emptyStringToNull = (property) => {
    const obj = { [property]: '' };
    expect(schema.parse(obj)[property]).toBe(null);
  };

  const nullThrow = (property) => {
    const obj = { [property]: null };
    expect(() => schema.parse(obj)).toThrow();
  };

  const stringNullThrow = (property) => {
    const obj = { [property]: 'null' };
    expect(() => schema.parse(obj)).toThrow();
  };

  const stringUndefinedThrow = (property) => {
    const obj = { [property]: 'undefined' };
    expect(() => schema.parse(obj)).toThrow();
  };

  const emptyStringThrow = (property) => {
    const obj = { [property]: '' };
    expect(() => schema.parse(obj)).toThrow();
  };

  const generalTests = {
    /**
     * The boolean validator
     */
    boolean: (property) => {
      it('should accept a boolean value', () => {
        const obj = { [property]: true };
        expect(schema.parse(obj)[property]).toBe(true);
        obj[property] = false;
        expect(schema.parse(obj)[property]).toBe(false);
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      if (strictCheck) {
        it('should not accept a stringified boolean value', () => {
          const obj = { [property]: 'true' };
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = 'false';
          expect(() => schema.parse(obj)).toThrow();
        });

        it('should not accept null', () => {
          nullThrow(property);
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, ['boolean', 'undefined']));
      } else {
        it('should accept a stringified boolean value and transform it to a boolean', () => {
          const obj = { [property]: 'true' };
          expect(schema.parse(obj)[property]).toBe(true);
          obj[property] = 'false';
          expect(schema.parse(obj)[property]).toBe(false);
        });

        it('should accept null', () => {
          acceptNull(property);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringBoolean',
            'stringUndefined',
            'stringNull',
            'boolean',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The string validator
     */
    string: (property, strictCheck) => {
      it('should accept a string value', () => {
        const obj = { [property]: 'text' };
        expect(schema.parse(obj)[property]).toBe('text');
        obj[property] = 'some-other-text';
        expect(schema.parse(obj)[property]).toBe('some-other-text');
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      if (strictCheck) {
        it("should not accept 'false', 'undefined', 'NaN', 'null', '' values", () => {
          const obj = { [property]: 'false' };
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = 'undefined';
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = 'NaN';
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = 'null';
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '';
          expect(() => schema.parse(obj)).toThrow();
        });

        it('should not accept null', () => {
          nullThrow(property);
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'string',
            'stringBoolean',
            'stringNumber',
            'stringBigInt',
            'stringSymbol',
            'stringObject',
            'stringArray',
            'stringFunction',
            'stringOther',
            'undefined'
          ]));
      } else {
        it("should accept 'false', 'undefined', 'NaN', 'null', '' values and trasform to null", () => {
          const obj = { [property]: 'false' };
          expect(schema.parse(obj)[property]).toBe(null);
          obj[property] = 'undefined';
          expect(schema.parse(obj)[property]).toBe(null);
          obj[property] = 'NaN';
          expect(schema.parse(obj)[property]).toBe(null);
          obj[property] = 'null';
          expect(schema.parse(obj)[property]).toBe(null);
          obj[property] = '';
          expect(schema.parse(obj)[property]).toBe(null);
        });

        it('should accept null', () => {
          acceptNull(property);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'string',
            'stringBoolean',
            'stringNumber',
            'stringBigInt',
            'stringUndefined',
            'stringNull',
            'stringSymbol',
            'stringObject',
            'stringArray',
            'stringFunction',
            'stringOther',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The accept values validator
     */
    acceptValues: (property, correctValue, incorrectValue) => {
      it(`should accept the following ${correctValue.join(', ')} values`, () => {
        correctValue.forEach((value) => {
          expect(schema.parse({ [property]: value })[property]).toBe(value);
        });
      });

      it(`should not accept the following ${incorrectValue.join(', ')} values`, () => {
        incorrectValue.forEach((value) => {
          expect(() => schema.parse({ [property]: value })).toThrow();
        });
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      if (strictCheck) {
        it('should not accept null', () => {
          nullThrow(property);
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, ['undefined']));
      } else {
        it('should accept null', () => {
          acceptNull(property);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringUndefined',
            'stringNull',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The nullable accept values validator
     */
    nullableAcceptValues: (property, correctValue, incorrectValue) => {
      it(`should accept the following ${correctValue.join(', ')} values`, () => {
        correctValue.forEach((value) => {
          expect(schema.parse({ [property]: value })[property]).toBe(value);
        });
      });

      it(`should not accept the following ${incorrectValue.join(', ')} values`, () => {
        incorrectValue.forEach((value) => {
          expect(() => schema.parse({ [property]: value })).toThrow();
        });
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      it('should accept null', () => {
        acceptNull(property);
      });

      if (strictCheck) {
        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, ['undefined', 'null']));
      } else {
        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringUndefined',
            'stringNull',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The object validator
     */
    object: (property) => {
      it('should accept any object values', () => {
        const obj = { [property]: {} };
        expect(schema.parse(obj)[property]).toEqual({});
        obj[property] = { a: 1 };
        expect(schema.parse(obj)[property]).toEqual({ a: 1 });
        obj[property] = { a: '1', b: { c: 3 } };
        expect(schema.parse(obj)[property]).toEqual({ a: '1', b: { c: 3 } });
      });

      it('should not accept any array values', () => {
        const obj = { [property]: [] };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = [1];
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = ['a'];
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = [{ a: 1 }];
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept any other object based values', () => {
        const obj = { [property]: function () {} };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = () => {};
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = new Date();
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      it('should accept null', () => {
        acceptNull(property);
      });

      if (strictCheck) {
        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'undefined',
            'null',
            'object',
            'other'
          ]));
      } else {
        it("should accept a string value that starts with the '{' and ends with the '}'", () => {
          const obj = { [property]: '{}' };
          expect(schema.parse(obj)[property]).toBe('{}');
          obj[property] = '{ a: 1 }';
          expect(schema.parse(obj)[property]).toBe('{ a: 1 }');
          obj[property] = '{ a: "1", b: { c: 3 } }';
          expect(schema.parse(obj)[property]).toBe('{ a: "1", b: { c: 3 } }');
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'undefined',
            'null',
            'emptyString',
            'stringUndefined',
            'stringNull',
            'stringObject',
            'object',
            'other'
          ]));
      }
    },

    /**
     * The array of strings validator
     */
    stringArray: (property, value, correctValue) => {
      it('should accept a string value or an array of strings and correctly parse it to an array of strings', () => {
        const obj = { [property]: value };
        expect(schema.parse(obj)[property]).toEqual(correctValue);
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      if (strictCheck) {
        it('should accept an empty array', () => {
          const obj = { [property]: [] };
          expect(schema.parse(obj)[property]).toEqual([]);
        });

        it('should accept an array of strings and filter it from the forbidden values', () => {
          const obj = {
            [property]: [...value, 'false', 'undefined', 'NaN', 'null', '']
          };
          expect(schema.parse(obj)[property]).toEqual(correctValue);
        });

        it('should not accept null', () => {
          nullThrow(property);
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, ['undefined', 'array']));
      } else {
        it("should accept a stringified array of the 'values' string and correctly parse it to an array of strings", () => {
          const obj = { [property]: `[${value}]` };
          expect(schema.parse(obj)[property]).toEqual(correctValue);
        });

        it('should filter a stringified array of a values string from forbidden values and correctly parse it to an array of strings', () => {
          const obj = {
            [property]: `[${value}, false, undefined, NaN, null,]`
          };
          expect(schema.parse(obj)[property]).toEqual(correctValue);
        });

        it('should accept null', () => {
          acceptNull(property);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'string',
            'stringBoolean',
            'stringNumber',
            'stringBigInt',
            'stringUndefined',
            'stringNull',
            'stringSymbol',
            'stringObject',
            'stringArray',
            'stringFunction',
            'stringOther',
            'array',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The positive number validator
     */
    positiveNum: (property) => {
      it('should accept a positive number value', () => {
        const obj = { [property]: 0.1 };
        expect(schema.parse(obj)[property]).toBe(0.1);
        obj[property] = 100.5;
        expect(schema.parse(obj)[property]).toBe(100.5);
        obj[property] = 750;
        expect(schema.parse(obj)[property]).toBe(750);
      });

      it('should not accept negative and non-positive number value', () => {
        const obj = { [property]: 0 };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = -100;
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept stringified negative and non-positive number value', () => {
        const obj = { [property]: '0' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '-100';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      if (strictCheck) {
        it('should not accept a stringified positive number value', () => {
          const obj = { [property]: '0.1' };
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '100.5';
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '750';
          expect(() => schema.parse(obj)).toThrow();
        });

        it('should not accept null', () => {
          nullThrow(property);
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      } else {
        it('should accept a stringified positive number value', () => {
          const obj = { [property]: '0.1' };
          expect(schema.parse(obj)[property]).toBe(0.1);
          obj[property] = '100.5';
          expect(schema.parse(obj)[property]).toBe(100.5);
          obj[property] = '750';
          expect(schema.parse(obj)[property]).toBe(750);
        });

        it('should accept null', () => {
          acceptNull(property);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The nullable positive number validator
     */
    nullablePositiveNum: (property) => {
      it('should accept a positive number value', () => {
        const obj = { [property]: 0.1 };
        expect(schema.parse(obj)[property]).toBe(0.1);
        obj[property] = 100.5;
        expect(schema.parse(obj)[property]).toBe(100.5);
        obj[property] = 750;
        expect(schema.parse(obj)[property]).toBe(750);
      });

      it('should not accept negative and non-positive number value', () => {
        const obj = { [property]: 0 };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = -100;
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept stringified negative and non-positive number value', () => {
        const obj = { [property]: '0' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '-100';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      it('should accept null', () => {
        acceptNull(property);
      });

      if (strictCheck) {
        it('should not accept a stringified positive number value', () => {
          const obj = { [property]: '0.1' };
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '100.5';
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '750';
          expect(() => schema.parse(obj)).toThrow();
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      } else {
        it('should accept a stringified positive number value', () => {
          const obj = { [property]: '0.1' };
          expect(schema.parse(obj)[property]).toBe(0.1);
          obj[property] = '100.5';
          expect(schema.parse(obj)[property]).toBe(100.5);
          obj[property] = '750';
          expect(schema.parse(obj)[property]).toBe(750);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The non-negative number validator
     */
    nonNegativeNum: (property) => {
      it('should accept a non-negative number value', () => {
        const obj = { [property]: 0 };
        expect(schema.parse(obj)[property]).toBe(0);
        obj[property] = 1000;
        expect(schema.parse(obj)[property]).toBe(1000);
      });

      it('should not accept a negative number value', () => {
        const obj = { [property]: -1000 };
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept a stringified negative number value', () => {
        const obj = { [property]: '-1000' };
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      if (strictCheck) {
        it('should not accept a stringified non-negative number value', () => {
          const obj = { [property]: '0' };
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '1000';
          expect(() => schema.parse(obj)).toThrow();
        });

        it('should not accept null', () => {
          nullThrow(property);
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      } else {
        it('should accept a stringified non-negative number value', () => {
          const obj = { [property]: '0' };
          expect(schema.parse(obj)[property]).toBe(0);
          obj[property] = '1000';
          expect(schema.parse(obj)[property]).toBe(1000);
        });

        it('should accept null', () => {
          acceptNull(property);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The nullable non-negative number validator
     */
    nullableNonNegativeNum: (property) => {
      it('should accept a non-negative number value', () => {
        const obj = { [property]: 0 };
        expect(schema.parse(obj)[property]).toBe(0);
        obj[property] = 1000;
        expect(schema.parse(obj)[property]).toBe(1000);
      });

      it('should not accept a negative number value', () => {
        const obj = { [property]: -1000 };
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept a stringified negative number value', () => {
        const obj = { [property]: '-1000' };
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      it('should accept null', () => {
        acceptNull(property);
      });

      if (strictCheck) {
        it('should not accept a stringified non-negative number value', () => {
          const obj = { [property]: '0' };
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '1000';
          expect(() => schema.parse(obj)).toThrow();
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      } else {
        it('should accept a stringified non-negative number value', () => {
          const obj = { [property]: '0' };
          expect(schema.parse(obj)[property]).toBe(0);
          obj[property] = '1000';
          expect(schema.parse(obj)[property]).toBe(1000);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The infile option validator
     */
    infile: (property) => {
      it('should accept string values that end with .json or .svg', () => {
        const obj = { [property]: 'chart.json' };
        expect(schema.parse(obj)[property]).toBe('chart.json');
        obj[property] = 'chart.svg';
        expect(schema.parse(obj)[property]).toBe('chart.svg');
      });

      it('should not accept string values that do not end with .json or .svg', () => {
        const obj = { [property]: 'chart.pdf' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = 'chart.png';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept string values that are not at least one character long without the extensions', () => {
        const obj = { [property]: '.json' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '.svg';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      it('should accept null', () => {
        acceptNull(property);
      });

      if (strictCheck) {
        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, ['undefined', 'null']));
      } else {
        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringUndefined',
            'stringNull',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The outfile option validator
     */
    outfile: (property) => {
      it('should accept string values that end with .jpeg, .jpg, .png, .pdf, or .svg', () => {
        const obj = { [property]: 'chart.jpeg' };
        expect(schema.parse(obj)[property]).toBe('chart.jpeg');
        obj[property] = 'chart.jpg';
        expect(schema.parse(obj)[property]).toBe('chart.jpg');
        obj[property] = 'chart.png';
        expect(schema.parse(obj)[property]).toBe('chart.png');
        obj[property] = 'chart.pdf';
        expect(schema.parse(obj)[property]).toBe('chart.pdf');
        obj[property] = 'chart.svg';
        expect(schema.parse(obj)[property]).toBe('chart.svg');
      });

      it('should not accept string values that do not end with .jpeg, .jpg, .png, .pdf, or .svg', () => {
        const obj = { [property]: 'chart.json' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = 'chart.txt';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept string values that are not at least one character long without the extensions', () => {
        const obj = { [property]: '.jpeg' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '.jpg';
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '.png';
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '.pdf';
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '.svg';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      it('should accept null', () => {
        acceptNull(property);
      });

      if (strictCheck) {
        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, ['undefined', 'null']));
      } else {
        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringUndefined',
            'stringNull',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The version option validator
     */
    version: (property) => {
      it("should accept the 'latest' value", () => {
        const obj = { [property]: 'latest' };
        expect(schema.parse(obj)[property]).toBe('latest');
      });

      it('should accept a value in XX, XX.YY, XX.YY.ZZ formats', () => {
        const obj = { [property]: '1' };
        expect(schema.parse(obj)[property]).toBe('1');
        obj[property] = '11';
        expect(schema.parse(obj)[property]).toBe('11');
        obj[property] = '1.1';
        expect(schema.parse(obj)[property]).toBe('1.1');
        obj[property] = '1.11';
        expect(schema.parse(obj)[property]).toBe('1.11');
        obj[property] = '11.1';
        expect(schema.parse(obj)[property]).toBe('11.1');
        obj[property] = '11.11';
        expect(schema.parse(obj)[property]).toBe('11.11');
        obj[property] = '1.1.1';
        expect(schema.parse(obj)[property]).toBe('1.1.1');
        obj[property] = '1.1.11';
        expect(schema.parse(obj)[property]).toBe('1.1.11');
        obj[property] = '1.11.1';
        expect(schema.parse(obj)[property]).toBe('1.11.1');
        obj[property] = '1.11.11';
        expect(schema.parse(obj)[property]).toBe('1.11.11');
        obj[property] = '11.1.1';
        expect(schema.parse(obj)[property]).toBe('11.1.1');
        obj[property] = '11.1.11';
        expect(schema.parse(obj)[property]).toBe('11.1.11');
        obj[property] = '11.11.1';
        expect(schema.parse(obj)[property]).toBe('11.11.1');
        obj[property] = '11.11.11';
        expect(schema.parse(obj)[property]).toBe('11.11.11');
      });

      it('should not accept other string value', () => {
        const obj = { [property]: 'string-other-than-latest' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '11a.2.0';
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '11.2.123';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      if (strictCheck) {
        it('should not accept null', () => {
          nullThrow(property);
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'stringNumber',
            'undefined'
          ]));
      } else {
        it('should accept null', () => {
          acceptNull(property);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The scale option validator
     */
    scale: (property) => {
      it('should accept number values between the 0.1 and 5.0', () => {
        const obj = { [property]: 0.1 };
        expect(schema.parse(obj)[property]).toBe(0.1);
        obj[property] = 1;
        expect(schema.parse(obj)[property]).toBe(1);
        obj[property] = 1.5;
        expect(schema.parse(obj)[property]).toBe(1.5);
        obj[property] = 5;
        expect(schema.parse(obj)[property]).toBe(5);
      });

      it('should not accept number values outside the 0.1 and 5.0', () => {
        const obj = { [property]: -1.1 };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = 0;
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = 5.5;
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept stringified number values outside the 0.1 and 5.0', () => {
        const obj = { [property]: '-1.1' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '0';
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '5.5';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      if (strictCheck) {
        it('should not accept stringified number values between the 0.1 and 5.0', () => {
          const obj = { [property]: '0.1' };
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '1';
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '1.5';
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '5';
          expect(() => schema.parse(obj)).toThrow();
        });

        it('should not accept null', () => {
          nullThrow(property);
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, ['number', 'undefined']));
      } else {
        it('should accept stringified number values between the 0.1 and 5.0', () => {
          const obj = { [property]: '0.1' };
          expect(schema.parse(obj)[property]).toBe(0.1);
          obj[property] = '1';
          expect(schema.parse(obj)[property]).toBe(1);
          obj[property] = '1.5';
          expect(schema.parse(obj)[property]).toBe(1.5);
          obj[property] = '5';
          expect(schema.parse(obj)[property]).toBe(5);
        });

        it('should accept null', () => {
          acceptNull(property);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The nullable scale option validator
     */
    nullableScale: (property) => {
      it('should accept number values between the 0.1 and 5.0', () => {
        const obj = { [property]: 0.1 };
        expect(schema.parse(obj)[property]).toBe(0.1);
        obj[property] = 1;
        expect(schema.parse(obj)[property]).toBe(1);
        obj[property] = 1.5;
        expect(schema.parse(obj)[property]).toBe(1.5);
        obj[property] = 5;
        expect(schema.parse(obj)[property]).toBe(5);
      });

      it('should not accept number values outside the 0.1 and 5.0', () => {
        const obj = { [property]: -1.1 };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = 0;
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = 5.5;
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept stringified number values outside the 0.1 and 5.0', () => {
        const obj = { [property]: '-1.1' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '0';
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '5.5';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      it('should accept null', () => {
        acceptNull(property);
      });

      if (strictCheck) {
        it('should not accept stringified number values between the 0.1 and 5.0', () => {
          const obj = { [property]: '0.1' };
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '1';
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '1.5';
          expect(() => schema.parse(obj)).toThrow();
          obj[property] = '5';
          expect(() => schema.parse(obj)).toThrow();
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'number',
            'undefined',
            'null'
          ]));
      } else {
        it('should accept stringified number values between the 0.1 and 5.0', () => {
          const obj = { [property]: '0.1' };
          expect(schema.parse(obj)[property]).toBe(0.1);
          obj[property] = '1';
          expect(schema.parse(obj)[property]).toBe(1);
          obj[property] = '1.5';
          expect(schema.parse(obj)[property]).toBe(1.5);
          obj[property] = '5';
          expect(schema.parse(obj)[property]).toBe(5);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The logLevel option validator
     */
    logLevel: (property) => {
      it('should accept integer number values between the 1 and 5', () => {
        const obj = { [property]: 1 };
        expect(schema.parse(obj)[property]).toBe(1);
        obj[property] = 3;
        expect(schema.parse(obj)[property]).toBe(3);
        obj[property] = 5;
        expect(schema.parse(obj)[property]).toBe(5);
      });

      it('should not accept float number values between the 1 and 5', () => {
        const obj = { [property]: 1.1 };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = 3.1;
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = 4.1;
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept stringified float number values between the 1 and 5', () => {
        const obj = { [property]: '1.1' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '3.1';
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '4.1';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept number values that fall outside the 1 and 5 range', () => {
        const obj = { [property]: -1.1 };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = 0;
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = 6;
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept stringified number number values that fall outside the 1 and 5 range', () => {
        const obj = { [property]: '-1.1' };
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '0';
        expect(() => schema.parse(obj)).toThrow();
        obj[property] = '6';
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      if (strictCheck) {
        it('should not accept null', () => {
          nullThrow(property);
        });

        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, ['number', 'undefined']));
      } else {
        it('should accept stringified number values between the 1 and 5', () => {
          const obj = { [property]: '1' };
          expect(schema.parse(obj)[property]).toBe(1);
          obj[property] = '3';
          expect(schema.parse(obj)[property]).toBe(3);
          obj[property] = '5';
          expect(schema.parse(obj)[property]).toBe(5);
        });

        it('should accept null', () => {
          acceptNull(property);
        });

        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringNumber',
            'stringUndefined',
            'stringNull',
            'number',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The resources option validator
     */
    resources: (property) => {
      it("should accept an object with properties 'js', 'css', and 'files'", () => {
        const obj = { [property]: { js: '', css: '', files: [] } };
        expect(schema.parse(obj)[property]).toEqual({
          js: null,
          css: null,
          files: []
        });
      });

      it("should accept an object with properties 'js', 'css', and 'files' with null values", () => {
        const obj = { [property]: { js: null, css: null, files: null } };
        expect(schema.parse(obj)[property]).toEqual({
          js: null,
          css: null,
          files: null
        });
      });

      it("should accept a partial object with some properties from the 'js', 'css', and 'files'", () => {
        const obj = { [property]: { js: 'console.log(1);' } };
        expect(schema.parse(obj)[property]).toEqual({ js: 'console.log(1);' });
      });

      it("should accept a stringified object with properties 'js', 'css', and 'files'", () => {
        const obj = { [property]: "{ js: '', css: '', files: [] }" };
        expect(schema.parse(obj)[property]).toBe(
          "{ js: '', css: '', files: [] }"
        );
      });

      it("should accept a stringified object with properties 'js', 'css', and 'files' with null values", () => {
        const obj = { [property]: '{ js: null, css: null, files: null }' };
        expect(schema.parse(obj)[property]).toBe(
          '{ js: null, css: null, files: null }'
        );
      });

      it("should accept a stringified partial object with some properties from the 'js', 'css', and 'files'", () => {
        const obj = { [property]: "{ js: 'console.log(1);' }" };
        expect(schema.parse(obj)[property]).toBe("{ js: 'console.log(1);' }");
      });

      it('should accept string values that end with .json', () => {
        const obj = { [property]: 'resources.json' };
        expect(schema.parse(obj)[property]).toBe('resources.json');
      });

      it('should not accept string values that do not end with .json', () => {
        const obj = { [property]: 'resources.js' };
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should not accept string values that are not at least one character long without the extensions', () => {
        const obj = { [property]: '.json' };
        expect(() => schema.parse(obj)).toThrow();
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      it('should accept null', () => {
        acceptNull(property);
      });

      if (strictCheck) {
        it('should not accept a stringified undefined', () => {
          stringUndefinedThrow(property);
        });

        it('should not accept a stringified null', () => {
          stringNullThrow(property);
        });

        it('should not accept an empty string', () => {
          emptyStringThrow(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'stringObject',
            'object',
            'other',
            'undefined',
            'null'
          ]));
      } else {
        it('should accept a stringified undefined and transform it to null', () => {
          stringUndefinedToNull(property);
        });

        it('should accept a stringified null and transform it to null', () => {
          stringNullToNull(property);
        });

        it('should accept an empty string and transform it to null', () => {
          emptyStringToNull(property);
        });

        it('should not accept values of other types', () =>
          validatePropOfSchema(schema, property, [
            'emptyString',
            'stringObject',
            'stringUndefined',
            'stringNull',
            'object',
            'other',
            'undefined',
            'null'
          ]));
      }
    },

    /**
     * The config object section validator
     */
    configObject: (property, object) => {
      it(`should accept an object with the ${property} properties`, () => {
        const obj = { [property]: object };
        expect(schema.parse(obj)[property]).toEqual(object);
      });

      it(`should accept an object with the ${property} properties and filter out other properties`, () => {
        const obj = { [property]: { ...object, extraProp: true } };
        expect(schema.parse(obj)[property]).toEqual({ ...object });
      });

      it(`should accept a partial object with some ${property} properties`, () => {
        for (const [key, value] of Object.entries(object)) {
          expect(
            schema.parse({ [property]: { [key]: value } })[property]
          ).toEqual({ [key]: value });
        }
        expect(
          schema.parse({ [property]: { extraProp: true } })[property]
        ).toEqual({});
      });

      it('should accept undefined', () => {
        acceptUndefined(property);
      });

      it('should accept object with no properties and transform it to undefined', () => {
        noPropertyToUndefined(property);
      });

      it('should not accept values of other types', () =>
        validatePropOfSchema(schema, property, [
          'undefined',
          'object',
          'other'
        ]));
    }
  };

  // The options config tests
  return {
    puppeteer: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    puppeteerArgs: (property, value, filteredValue) => {
      describe(property, () =>
        generalTests.stringArray(property, value, filteredValue)
      );
    },
    highcharts: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    highchartsVersion: (property) => {
      describe(property, () => generalTests.version(property));
    },
    highchartsCdnUrl: (property, correctValue, incorrectValue) => {
      describe(property, () =>
        generalTests.acceptValues(property, correctValue, incorrectValue)
      );
    },
    highchartsForceFetch: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    highchartsCachePath: (property) => {
      describe(property, () => generalTests.string(property, strictCheck));
    },
    highchartsAdminToken: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    highchartsCoreScripts: (property, value, filteredValue) => {
      describe(property, () =>
        generalTests.stringArray(property, value, filteredValue)
      );
    },
    highchartsModuleScripts: (property, value, filteredValue) => {
      describe(property, () =>
        generalTests.stringArray(property, value, filteredValue)
      );
    },
    highchartsIndicatorScripts: (property, value, filteredValue) => {
      describe(property, () =>
        generalTests.stringArray(property, value, filteredValue)
      );
    },
    highchartsCustomScripts: (property, value, filteredValue) => {
      describe(property, () =>
        generalTests.stringArray(property, value, filteredValue)
      );
    },
    export: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    exportInfile: (property) => {
      describe(property, () => generalTests.infile(property));
    },
    exportInstr: (property) => {
      describe(property, () => generalTests.object(property));
    },
    exportOptions: (property) => {
      describe(property, () => generalTests.object(property));
    },
    exportOutfile: (property) => {
      describe(property, () => generalTests.outfile(property));
    },
    exportType: (property, correctValue, incorrectValue) => {
      describe(property, () =>
        generalTests.acceptValues(property, correctValue, incorrectValue)
      );
    },
    exportConstr: (property, correctValue, incorrectValue) => {
      describe(property, () =>
        generalTests.acceptValues(property, correctValue, incorrectValue)
      );
    },
    exportDefaultHeight: (property) => {
      describe(property, () => generalTests.positiveNum(property));
    },
    exportDefaultWidth: (property) => {
      describe(property, () => generalTests.positiveNum(property));
    },
    exportDefaultScale: (property) => {
      describe(property, () => generalTests.scale(property));
    },
    exportHeight: (property) => {
      describe(property, () => generalTests.nullablePositiveNum(property));
    },
    exportWidth: (property) => {
      describe(property, () => generalTests.nullablePositiveNum(property));
    },
    exportScale: (property) => {
      describe(property, () => generalTests.nullableScale(property));
    },
    exportGlobalOptions: (property) => {
      describe(property, () => generalTests.object(property));
    },
    exportThemeOptions: (property) => {
      describe(property, () => generalTests.object(property));
    },
    exportBatch: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    exportRasterizationTimeout: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    customLogic: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    customLogicAllowCodeExecution: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    customLogicAllowFileResources: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    customLogicCustomCode: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    customLogicCallback: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    customLogicResources: (property) => {
      describe(property, () => generalTests.resources(property));
    },
    customLogicLoadConfig: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    customLogicCreateConfig: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    server: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    serverEnable: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    serverHost: (property) => {
      describe(property, () => generalTests.string(property, strictCheck));
    },
    serverPort: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    serverBenchmarking: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    serverProxy: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    serverProxyHost: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    serverProxyPort: (property) => {
      describe(property, () => generalTests.nullableNonNegativeNum(property));
    },
    serverProxyTimeout: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    serverRateLimiting: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    serverRateLimitingEnable: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    serverRateLimitingMaxRequests: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    serverRateLimitingWindow: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    serverRateLimitingDelay: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    serverRateLimitingTrustProxy: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    serverRateLimitingSkipKey: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    serverRateLimitingSkipToken: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    serverSsl: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    serverSslEnable: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    serverSslForce: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    serverSslPort: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    serverSslCertPath: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    pool: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    poolMinWorkers: (property) => {
      describe(property, () => generalTests.positiveNum(property));
    },
    poolMaxWorkers: (property) => {
      describe(property, () => generalTests.positiveNum(property));
    },
    poolWorkLimit: (property) => {
      describe(property, () => generalTests.positiveNum(property));
    },
    poolAcquireTimeout: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    poolCreateTimeout: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    poolDestroyTimeout: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    poolIdleTimeout: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    poolCreateRetryInterval: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    poolReaperInterval: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    poolBenchmarking: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    logging: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    loggingLevel: (property) => {
      describe(property, () => generalTests.logLevel(property, strictCheck));
    },
    loggingFile: (property) => {
      describe(property, () => generalTests.string(property, strictCheck));
    },
    loggingDest: (property) => {
      describe(property, () => generalTests.string(property, strictCheck));
    },
    loggingToConsole: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    loggingToFile: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    ui: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    uiEnable: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    uiRoute: (property, correctValue, incorrectValue) => {
      describe(property, () =>
        generalTests.acceptValues(property, correctValue, incorrectValue)
      );
    },
    other: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    otherNodeEnv: (property, correctValue, incorrectValue) => {
      describe('other.nodeEnv', () =>
        generalTests.acceptValues(property, correctValue, incorrectValue));
    },
    otherListenToProcessExits: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    otherNoLogo: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    otherHardResetPage: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    otherBrowserShellMode: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    debug: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    debugEnable: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    debugHeadless: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    debugDevtools: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    debugListenToConsole: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    debugDumpio: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    debugSlowMo: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    debugDebuggingPort: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    webSocket: (property, value) => {
      describe(property, () => generalTests.configObject(property, value));
    },
    webSocketEnable: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    webSocketReconnect: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    webSocketRejectUnauthorized: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    webSocketPingTimeout: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    webSocketReconnectInterval: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    webSocketReconnectAttempts: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    webSocketMessageInterval: (property) => {
      describe(property, () => generalTests.nonNegativeNum(property));
    },
    webSocketGatherAllOptions: (property) => {
      describe(property, () => generalTests.boolean(property));
    },
    webSocketUrl: (property, correctValue, incorrectValue) => {
      describe(property, () =>
        generalTests.nullableAcceptValues(
          property,
          correctValue,
          incorrectValue
        )
      );
    },
    webSocketSecret: (property) => {
      describe(property, () => generalTests.string(property, false));
    },
    payload: (property) => {
      describe(property, () => {});
    }
  };
};
