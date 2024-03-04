import { Session, getServerSession } from 'next-auth';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import { authConfig } from '../../../pages/api/auth/[...nextauth]';
import { LogoutButton } from './LogoutButtons';
import { getAuthSession } from '@/lib/auth';



export const User  = async () => {
    const session = await getAuthSession();

    if (!session?.user) {
        return <p>No user</p>;
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{session.user.name}</CardTitle>
                <CardDescription>
                    <Avatar>
                        <AvatarImage src={session.user.image ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{session.user.email}</p>
                <p>{session.user.id}</p>
            </CardContent>
            <CardFooter>
                <LogoutButton />
            </CardFooter>
        </Card>
    );
};
