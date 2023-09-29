'use client'

import { FunctionComponent, ReactNode } from 'react';

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/server';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, User } from "@nextui-org/react";

interface NavProps {
    user: KindeUser;
    isAuthenticated: boolean;
    KindeAuth: ReactNode;
    Logout: ReactNode;
}

const Nav: FunctionComponent<NavProps> =
    ({ user, isAuthenticated, KindeAuth, Logout }) => {
        const pathname = usePathname();

        const authenticatedMenus: Menus = [
            {
                name: 'Dashboard',
                pathname: '/dashboard',
                // icon: <GiEarthAmerica className={styles.icon} />,
                isActive: function () {
                    return this.pathname == pathname
                }
            },
            {
                name: 'Leaderboard',
                pathname: '/leaderboard',
                // icon: <GiEarthAmerica className={styles.icon} />,
                isActive: function () {
                    return this.pathname == pathname
                }
            }
        ];

        return (
            <Navbar
                shouldHideOnScroll
                classNames={{
                    item: [
                        "flex",
                        "relative",
                        "h-full",
                        "items-center",
                        "data-[active=true]:after:content-['']",
                        "data-[active=true]:after:absolute",
                        "data-[active=true]:after:bottom-0",
                        "data-[active=true]:after:left-0",
                        "data-[active=true]:after:right-0",
                        "data-[active=true]:after:h-[2px]",
                        "data-[active=true]:after:rounded-[2px]",
                        "data-[active=true]:after:bg-primary",
                    ],
                }}
            >
                <NavbarBrand>
                    <p className="font-bold text-inherit">BrainBout</p>
                </NavbarBrand>
                {
                    isAuthenticated && (
                        <>
                            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                                {
                                    authenticatedMenus.map((menu) => (
                                        <NavbarItem
                                            key={menu.name}
                                            isActive={menu.isActive()}
                                        >
                                            <Link
                                                color={menu.isActive() ? undefined : "foreground"}
                                                href={menu.pathname}
                                            >
                                                {menu.name}
                                            </Link>
                                        </NavbarItem>
                                    ))
                                }
                            </NavbarContent>
                            <NavbarContent as="div" justify="end">
                                <Dropdown placement="bottom-end">
                                    <DropdownTrigger>
                                        <Avatar
                                            isBordered
                                            as="button"
                                            className="transition-transform"
                                            color="success"
                                            name={`${user?.given_name} ${user?.family_name}`}
                                            size="sm"
                                            src={user?.picture || 'https://res.cloudinary.com/dwwdihklx/image/upload/v1695957223/display-pictures/t77vrr2xn7pdz5vukzjk.jpg'}
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                                        <DropdownItem key="profile" className="h-14 gap-2" textValue='Avatar'>
                                            <p className="font-semibold text-tiny">Signed in as</p>
                                            <p className="font-semibold text-tiny">{user?.given_name} {user?.family_name}</p>
                                        </DropdownItem>
                                        <DropdownItem key="logout" color="danger" textValue='Logout'>
                                            {Logout}
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavbarContent>
                        </>
                    )
                }
                {
                    !isAuthenticated && (
                        <NavbarContent justify="end">
                            {KindeAuth}
                        </NavbarContent>
                    )
                }
            </Navbar>
        );
    }

export default Nav;