export enum ENUM_FILTER_OPERATOR_TYPE {
  /**
   * Equal to
   */
  EQ = 'eq',
  /**
   * Greater than
   */
  GT = 'gt',
  /**
   * Greater than or equal to
   */
  GTE = 'gte',
  /**
   * Less than
   */
  LT = 'lt',
  /**
   * Less than or equal to
   */
  LTE = 'lte',
  /**
   * Regular expression
   */
  REGEX = 'regex',
  /**
   * Text
   */
  TEXT_SEARCH = '$text',
  /**
   * Array based search with "$in" mongo operator
   */
  _IN = 'in',
  /**
   * Array based search with "$nin" mongo operator
   */
  _NIN = 'nin',
}

export enum REGEX_SEARCH_MODE_TYPE {
  /**
   * Start With Mode
   */
  SWM = 'swm',
  /**
   * Begin With Mode
   */
  BNM = 'bnm',
  /**
   * End With Mode
   */
  EWM = 'ewm',
}

export type VALID_MONGO_FIELD = string & { __validMongoField: true };

export type TYPE_STRING_NUM_ARRAY = (string | number)[];

export const REGEX_MONGO_FIELD_NAME = /^[a-zA-Z_]+$/;

const isValidMongoField = (x: string): x is VALID_MONGO_FIELD => {
  return REGEX_MONGO_FIELD_NAME.test(x);
};
