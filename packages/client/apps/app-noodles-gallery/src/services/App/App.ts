import { inject } from '@noodlestan/ui-services';
import { Accessor } from 'solid-js';

import { RootsService } from '../Roots';
import { UsersService } from '../Users';

type AppServiceService = {
    ready: Accessor<boolean>;
    error: Accessor<string>;
};

export const createAppService = (): AppServiceService => {
    const { loading: usersLoading, error: usersError } = inject(UsersService);
    const { loading: rootsLoading, error: rootsError } = inject(RootsService);

    return {
        ready: () => !usersLoading() && !rootsLoading(),
        error: () => usersError() || rootsError(),
    };
};
