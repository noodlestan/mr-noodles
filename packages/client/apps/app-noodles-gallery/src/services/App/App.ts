import { inject } from '@noodlestan/ui-services';
import { Accessor } from 'solid-js';

import { UsersService } from '../Users';

type AppServiceService = {
    ready: Accessor<boolean>;
    error: Accessor<string>;
};

export const createAppService = (): AppServiceService => {
    const { loading, error } = inject(UsersService);

    return {
        ready: () => !loading(),
        error: () => error(),
    };
};
