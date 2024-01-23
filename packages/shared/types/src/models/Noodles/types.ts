import { ImageFile } from '../ImageProfiles/types.js';
import { LatLong, Noodle } from '../types.js';

export interface BaseNoodle extends Noodle {
    dateCreated: Date;
    dateUpdated?: Date;
    title?: string;
    images?: ImageFile[];
}

export interface HashableNoodle extends BaseNoodle {
    hash: string;
    dateHashed: Date;
}

export interface SizeableNoodle extends BaseNoodle {
    orientation: number;
    width: number;
    height: number;
}

export interface LocatableNoodle extends BaseNoodle {
    location?: LatLong;
}
