import { useNavigate } from '@solidjs/router';
import { Component, JSX, createEffect } from 'solid-js';

import { useCurrentUserContext } from '@/providers/CurrentUser';

type RequireNotUserProps = {
    children?: JSX.Element;
};

export const RequireNotUser: Component<RequireNotUserProps> = props => {
    const { currentUserId } = useCurrentUserContext();

    const navigate = useNavigate();

    createEffect(() => {
        if (currentUserId()) {
            navigate('/user/home', { scroll: true });
        }
    });

    return <>{props.children}</>;
};
