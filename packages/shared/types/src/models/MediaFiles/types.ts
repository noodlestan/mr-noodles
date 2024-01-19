import { FileNoodle } from '../Files';
import { HashableNoodle, SizeableNoodle } from '../Noodles';

export interface MediaFileNoodle extends FileNoodle, HashableNoodle, SizeableNoodle {
    type: 'file';
    mediaType: 'image' | 'video';
    dateTaken?: Date;
}
