// import { FilterQuery } from './users/findUsers';

// const patternFilter = (
//     field: string,
//     value: string,
// ): { [x: string]: { $regex: RegExp } } | undefined => {
//     if (/[a-z0-9/.*{},]/i.test(value)) {
//         // eslint-disable-next-line security/detect-non-literal-regexp
//         return { [field]: { $regex: new RegExp(`${value}`, 'i') } };
//     }
//     return undefined;
// };

// export const pushPatternFilter = (
//     $and: FilterQuery<unknown>,
//     field: string,
//     value: string | undefined,
// ): void => {
//     if (value) {
//         const filter = patternFilter(field, value);
//         if (filter) {
//             $and.push(filter);
//         }
//     }
// };

// export const pushEqualsFilter = (
//     $and: FilterQuery<unknown>,
//     field: string,
//     value: string | number | undefined,
// ): void => {
//     if (value) {
//         const filter = value && { [field]: { $eq: value } };
//         $and.push(filter);
//     }
// };
// export const pushRangeFilter = (
//     $and: FilterQuery<unknown>,
//     field: string,
//     valueFrom: Date | number | undefined,
//     valueUntil: Date | number | undefined,
// ): void => {
//     if (valueFrom && valueUntil && !isNaN(valueFrom.valueOf()) && !isNaN(valueUntil.valueOf())) {
//         $and.push({ [field]: { $gte: valueFrom } });
//         $and.push({ [field]: { $lte: valueUntil } });
//     }
// };

// export const pushGreaterThanFilter = (
//     $and: FilterQuery<unknown>,
//     field: string,
//     value: Date | number | undefined,
// ): void => {
//     if (value && value && !isNaN(value.valueOf()) && !isNaN(value.valueOf())) {
//         $and.push({ [field]: { $gte: value } });
//     }
// };

// export const pushLowerThanFilter = (
//     $and: FilterQuery<unknown>,
//     field: string,
//     value: Date | number | undefined,
// ): void => {
//     if (value && value && !isNaN(value.valueOf()) && !isNaN(value.valueOf())) {
//         $and.push({ [field]: { $lte: value } });
//     }
// };
