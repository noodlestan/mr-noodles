import { readFile } from 'fs/promises';

import { connect } from '../src/db';
import { Photo } from '../src/models/photo';

const main = async () => {
    await connect();

    const file = await readFile('/tmp/photos.txt');
    const filenames = file.toString().split('\n');

    const promises = filenames.map(filename => Photo.findByFilename(filename));

    const photos = await Promise.all(promises);

    filenames.forEach((filename, index) => {
        if (!photos[index]) {
            console.info(filename);
        } else if (filename !== photos[index].filename) {
            console.info(filename, '!!');
        }
    });
};

main();
