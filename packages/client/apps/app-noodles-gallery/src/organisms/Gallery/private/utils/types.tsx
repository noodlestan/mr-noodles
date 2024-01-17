import type { PhotoModel } from '@noodlestan/shared-types';

export type GallerySubGroupTuple = [string, PhotoModel[]];
export type GallerySubGroupList = Array<GallerySubGroupTuple>;
export type GalleryGroupTuple = [string, GallerySubGroupList];
export type GalleryGroupList = Array<[string, PhotoModel[] | GallerySubGroupList]>;
