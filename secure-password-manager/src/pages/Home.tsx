import React from 'react';
import {
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    useDisclosure,
    BoxProps,
    FlexProps,
} from '@chakra-ui/react';
import {IconType} from 'react-icons';
import {ReactText} from 'react';
import {FaEdit, FaHome, FaKey, FaSignOutAlt, FaUserShield} from "react-icons/fa";
import {useUser} from "use-supabase";
import {useLocation} from "wouter";

interface LinkItemProps {
    name: string;
    icon: IconType;
    route: string;
}

const LinkItems: Array<LinkItemProps> = [
    {name: 'Home', icon: FaHome, route: "/home"},
    {name: 'Password Generator', icon: FaKey, route: "/home/passwordgen"},
    {name: 'Security', icon: FaUserShield, route: "/home/security"},
    {name: 'Settings', icon: FaEdit, route: "/home/settings"},
    {name: 'Logout', icon: FaSignOutAlt, route: "/logout"}
];

export default function Home(props: { child: React.ReactNode; }) {
    const {isOpen, onClose} = useDisclosure();
    const [location, setLocation] = useLocation();
    if (!useUser()) {
        setLocation("/")
    }
    return (
        <Box minH="calc (100vh - 50px)">
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Box paddingLeft={40} minH={"calc(100vh - 50px)"}>
                {props.child}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
    const [location, setLocation] = useLocation();
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: 40}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                {/*<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">*/}
                {/*    Logo*/}
                {/*</Text>*/}
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} onClick={() => {
                    setLocation(link.route)
                }}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}

const NavItem = ({icon, children, ...rest}: NavItemProps) => {
    return (
        <Link href="#" style={{textDecoration: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: '#0593ff',
                    // bgGradient: "linear(to-r, red.400,pink.400)",
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};



