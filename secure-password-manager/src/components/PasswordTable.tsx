import {
    Table, Tbody, Td,
    Th, Thead, Tr,
    Image, Popover,
    PopoverTrigger, Button,
    PopoverContent, PopoverHeader,
    PopoverCloseButton, PopoverArrow,
    LightMode, DarkMode, Link, Spinner
} from "@chakra-ui/react";

export interface PasswordItem {
    title: string;
    website: string;
    icon: string;
    username: string;
    password: string;
}

interface PasswordTableParams {
    items: PasswordItem[];
}

export const PasswordTable = ({items}: PasswordTableParams) => {
    if (items.length < 0) {
        return <Spinner size='xl'/>;
    } else {
        return (
            <LightMode>
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Logo</Th>
                            <Th>Website</Th>
                            <Th>Username</Th>
                            <Th>Password</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items.map((data: PasswordItem) => (
                            <TableItem key={data.title} icon={data.icon} title={data.title} password={data.password}
                                       username={data.username} website={data.website}/>
                        ))}
                    </Tbody>
                </Table>
            </LightMode>
        );
    }
};

const TableItem = (item: PasswordItem) => {
    return (
        <Tr>
            <Td>
                <Link href={item.website} isExternal>
                    <Image src={item.icon} height={8} width={8}/>
                </Link>
            </Td>
            <Td color={'gray.800'}>{item.title}</Td>
            <Td color={'gray.800'}>{item.username}</Td>
            <Td>
                <DarkMode>
                    <Popover>
                        <PopoverTrigger>
                            <Button fontFamily={'heading'} w={'full'}
                                    bgGradient="linear(to-r, red.400,pink.400)"
                                    color={'white'}
                                    _hover={{
                                        bgGradient: 'linear(to-r, red.400,pink.400)',
                                        boxShadow: 'xl',
                                    }}>Show</Button>
                        </PopoverTrigger>
                        <PopoverContent mr={2}>
                            <PopoverArrow/>
                            <PopoverCloseButton/>
                            <PopoverHeader>{item.password}</PopoverHeader>
                        </PopoverContent>
                    </Popover>
                </DarkMode>
            </Td>
        </Tr>
    );
};