import type { ImageNoodle } from '@noodlestan/shared-types';

export type GallerySubGroupTuple = [string, ImageNoodle[]];
export type GallerySubGroupList = Array<GallerySubGroupTuple>;
export type GalleryGroupTuple = [string, GallerySubGroupList];
export type GalleryGroupList = Array<[string, ImageNoodle[] | GallerySubGroupList]>;
