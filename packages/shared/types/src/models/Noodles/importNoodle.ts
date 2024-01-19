import { importNoodleData } from './importNoodleData';
import { BaseNoodle } from './types';

export function importNoodle<T extends BaseNoodle>(data: T): T {
    return importNoodleData(data) as T;
}
