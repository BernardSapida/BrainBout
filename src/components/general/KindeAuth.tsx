import { FunctionComponent } from 'react';

import { Button } from "@nextui-org/react";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

interface KindeAuthProps { }

const KindeAuth: FunctionComponent<KindeAuthProps> = () => {
    return (
        <>
            <LoginLink>
                {/* <Button color="primary" href="#" variant="flat"> */}
                Sign in
                {/* </Button> */}
            </LoginLink >
            <RegisterLink>Sign up</RegisterLink>
        </>
    );
}

export default KindeAuth;