import { isArray, isPlainObject, mapValues } from 'lodash';

export interface Opts {
  readonly propertyName: string;
  readonly converter: (propertyValue: any) => any;
  readonly filter: any;
  readonly useConverter?: boolean;
}

const convertPropertyFilter = ({
  converter,
  filter,
  propertyName,
  useConverter = false,
}: Opts): any => {
  if (isPlainObject(filter)) {
    return mapValues(filter, (subFilter, filterKey) => {
      if (filterKey !== propertyName) {
        return convertPropertyFilter({
          converter,
          filter: subFilter,
          propertyName,
          useConverter,
        });
      }
      return convertPropertyFilter({
        converter,
        filter: subFilter,
        propertyName,
        useConverter: true,
      });
    });
  }
  if (isArray(filter)) {
    return filter.map((subFilter) => {
      return convertPropertyFilter({
        converter,
        filter: subFilter,
        propertyName,
        useConverter,
      });
    });
  }
  if (!useConverter) {
    return filter;
  }
  return converter(filter);
};

export default convertPropertyFilter;
