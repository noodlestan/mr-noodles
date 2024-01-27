import { useNavigate } from '@solidjs/router';
import { Component, JSX, createEffect } from 'solid-js';

import { useCurrentUserContext } from '@/providers/CurrentUser';

type RequireUserProps = {
    children?: JSX.Element;
};

export const RequireUser: Component<RequireUserProps> = props => {
    const { currentUserId } = useCurrentUserContext();

    const navigate = useNavigate();

    createEffect(() => {
        if (!currentUserId()) {
            navigate('/', { scroll: true });
        }
    });

    return <>{props.children}</>;
};
