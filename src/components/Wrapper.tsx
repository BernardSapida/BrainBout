import { FunctionComponent, ReactNode } from 'react';

interface WrapperProps {
    children: ReactNode
}

const Wrapper: FunctionComponent<WrapperProps> = ({ children }) => {
    return (
        <section className='mx-auto my-10 w-full max-w-screen-xl px-2.5 md:px-20'>
            {children}
        </section>
    );
}

export default Wrapper;