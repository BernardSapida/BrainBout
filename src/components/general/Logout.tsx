import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

import { FunctionComponent } from 'react';

interface LogoutProps { }

const Logout: FunctionComponent<LogoutProps> = () => {
    return (
        <LogoutLink className='block w-full'>Logout</LogoutLink>
    );
}

export default Logout;