import { ownDataProvider } from './ownDataProvider.js';
import jobsProvider from './jobsProvider.js'
import usersProvider from './usersProvider.js';

import { userOrders } from '../data/data.js';

import { combineDataProviders } from 'react-admin';

const userOrdersProvider = ownDataProvider(userOrders);

export const dataCombinedProvider = combineDataProviders((resource) => {
    switch (resource) {
        case "orders":
            return jobsProvider;
        case "freelancers":
            return usersProvider;
        case "User-orders":
            return userOrdersProvider;
        default:
            throw new Error(`Unknown resource: ${resource}`);
    }
});
