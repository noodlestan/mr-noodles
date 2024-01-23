import { importNoodleData } from './importNoodleData.js';
import { BaseNoodle } from './types.js';

export function importNoodle<T extends BaseNoodle>(data: T): T {
    return importNoodleData(data) as T;
}
