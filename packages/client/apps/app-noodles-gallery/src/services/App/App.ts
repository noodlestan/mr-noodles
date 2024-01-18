import { inject } from '@noodlestan/ui-services';
import { Accessor } from 'solid-js';

import { UsersService } from '../Users';

type AppServiceService = {
    ready: Accessor<boolean>;
};

export const createAppService = (): AppServiceService => {
    const { loading } = inject(UsersService);

    return {
        ready: () => !loading(),
    };
};
