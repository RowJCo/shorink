import PropTypes from 'prop-types';
import userStore from '../stores/userStore.js';
import { useEffect, useState } from 'react';
import debounce from './debounce.js';

const RequireAuth = (props) => {
    const store = userStore();
    const [initialized, setInitialized] = useState(false);

    if (!initialized) {
        store.checkAuth();
        setInitialized(true);
    }

    useEffect(() => {
        let timeoutId;
    
        const debouncedCheckAuth = debounce(() => {
          store.checkAuth();
        }, 10000);
    
        debouncedCheckAuth();
    
        return () => {
          clearTimeout(timeoutId);
        };
    }, [store]);

    if (store.signedIn && store.signedIn === true) {
        return (
            <div>
                {props.children}
            </div>
        );
    } else {
        return (
            <div className="flex flex-col gap-5 self-center py-5 text-gray-800 flex-1 px-4">
                <div className="flex flex-col gap-5">
                    <p className="text-center text-2xl font-bold mt-10">
                        You must be signed in to access this page.
                    </p>
                </div>
            </div>
        );
    }
};

RequireAuth.propTypes = {
    children: PropTypes.node.isRequired
};

export default RequireAuth;