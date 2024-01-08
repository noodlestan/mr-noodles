import { AlbumData } from '@noodlestan/shared-types';

export const createAlbumFromChild = (slug: string, title: string, level: number): AlbumData => {
    const slugParts = slug.split('/');
    const titleParts = title.split('/');
    return {
        id: '',
        photos: [],
        dateCreated: new Date(),
        slug: slugParts.slice(0, level).join('/'),
        title: titleParts.slice(0, level).join('/'),
    };
};

export const searchByParent = (items: AlbumData[], parent: string): AlbumData[] => {
    const parentIndex = (parent && parent.split('/').length) || 0;
    return Object.values(
        items.reduce(
            (acc, album) => {
                const { slug, title } = album;
                const isSubAlbum = slug !== parent && slug.startsWith(parent || '');
                const slugLevel = slug.split('/').length;
                const isDirectChild = isSubAlbum && slugLevel === parentIndex + 1;
                if (isDirectChild) {
                    acc[slug] = album;
                } else if (isSubAlbum) {
                    const maybeChild = createAlbumFromChild(slug, title || '', parentIndex + 1);
                    if (!acc[maybeChild.slug]) {
                        acc[maybeChild.slug] = maybeChild;
                    }
                }
                return acc;
            },
            {} as Record<string, AlbumData>,
        ),
    );
};

export const searchItems = (items: AlbumData[], search: string): AlbumData[] => {
    return items.filter(album => {
        const { slug, title } = album;
        return slug.includes(search) || title?.includes(search);
    });
};
