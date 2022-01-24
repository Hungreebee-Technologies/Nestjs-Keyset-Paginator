import { filterDto } from './pagination.dto';
import {
  ENUM_FILTER_OPERATOR_TYPE,
  REGEX_SEARCH_MODE_TYPE,
} from '../common.types';

/**
 * @param  {filterDto[]} filter
 */

export const generatePaginationFilter = (filter: filterDto[]) => {
  const filter_fn = {};
  for (const filterElement of filter) {
    if (filterElement.operator === ENUM_FILTER_OPERATOR_TYPE.REGEX) {
      let exp = new RegExp(filterElement.value, 'i');
      if (filterElement.mode === REGEX_SEARCH_MODE_TYPE.SWM) {
        exp = new RegExp('^' + filterElement.value + '.*', 'i');
      }
      if (filterElement.mode === REGEX_SEARCH_MODE_TYPE.BNM) {
        exp = new RegExp('.*' + filterElement.value + '.*', 'i');
      }
      if (filterElement.mode === REGEX_SEARCH_MODE_TYPE.EWM) {
        // console.log('EWM\n');
        exp = new RegExp(filterElement.value + '.*', 'i');
      }
      filter_fn[filterElement.name] = {
        ['$' + filterElement.operator]: exp,
      };
    } else if (
      filterElement.operator === ENUM_FILTER_OPERATOR_TYPE._IN ||
      filterElement.operator === ENUM_FILTER_OPERATOR_TYPE._NIN
    ) {
      filter_fn[filterElement.name] = {
        ['$' + filterElement.operator]: filterElement.arr_value,
      };
    } else if (filterElement.operator === ENUM_FILTER_OPERATOR_TYPE.TEXT_SEARCH) {
      filter_fn[filterElement.name] = {
        $search: filterElement.value,
      };
    } else
      filter_fn[filterElement.name] = {
        ['$' + filterElement.operator]: filterElement.value,
      };
  }
  return filter_fn;
};
