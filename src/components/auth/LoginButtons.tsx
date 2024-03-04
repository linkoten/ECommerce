'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';

export const LoginButton = () => {
    return (
        <Button
            onClick={async () => {
                await signIn();
            }}
        >
            Login
        </Button>
    );
};
