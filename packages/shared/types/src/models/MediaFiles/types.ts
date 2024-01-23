import { FileNoodle } from '../Files/index.js';
import { HashableNoodle, SizeableNoodle } from '../Noodles/index.js';

export interface MediaFileNoodle extends FileNoodle, HashableNoodle, SizeableNoodle {
    type: 'file';
    mediaType: 'image' | 'video';
    dateTaken?: Date;
}
