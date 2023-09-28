'use client'

import { FunctionComponent } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";

interface NavProps { }

const Nav: FunctionComponent<NavProps> = () => {
    const pathname = usePathname();

    const menus: Menus = [
        {
            name: 'Dashboard',
            pathname: '/',
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
                <p className="font-bold text-inherit">BSCS Reviewer</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {
                    menus.map((menu) => (
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
        </Navbar>
    );
}

export default Nav;