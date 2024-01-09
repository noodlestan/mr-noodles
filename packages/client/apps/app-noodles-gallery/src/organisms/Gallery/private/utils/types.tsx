import type { PhotoData } from '@noodlestan/shared-types';

export type GallerySubGroupTuple = [string, PhotoData[]];
export type GallerySubGroupList = Array<GallerySubGroupTuple>;
export type GalleryGroupTuple = [string, GallerySubGroupList];
export type GalleryGroupList = Array<[string, PhotoData[] | GallerySubGroupList]>;
