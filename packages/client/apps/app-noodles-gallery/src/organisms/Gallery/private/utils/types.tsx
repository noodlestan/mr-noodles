import type { BaseNoodle } from '@noodlestan/shared-types';

export type GallerySubGroupTuple = [string[], BaseNoodle[]];
export type GallerySubGroupList = Array<GallerySubGroupTuple>;
export type GalleryGroupTuple = [string[], GallerySubGroupList];
export type GalleryGroupList = Array<[string[], BaseNoodle[] | GallerySubGroupList]>;
