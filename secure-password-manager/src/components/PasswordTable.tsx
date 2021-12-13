import {
    Table, Tbody, Td,
    Th, Thead, Tr,
    Image, Popover,
    PopoverTrigger, Button,
    PopoverContent, PopoverHeader,
    PopoverCloseButton, PopoverArrow,
    LightMode, DarkMode, Link
} from "@chakra-ui/react";

interface PasswordItemProps {
    title: string;
    website: string;
    icon: string;
    username: string;
    password: string;
}

const TableItems: Array<PasswordItemProps> = [
    {
        title: "Facebook",
        website: "https://facebook.com",
        icon: "https://facebook.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordfacebook"
    },
    {
        title: "Google",
        website: "https://google.com",
        icon: "https://google.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordgoogle"
    },
    {
        title: "Facebook",
        website: "https://facebook.com",
        icon: "https://facebook.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordfacebook"
    },
    {
        title: "Google",
        website: "https://google.com",
        icon: "https://google.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordgoogle"
    },{
        title: "Facebook",
        website: "https://facebook.com",
        icon: "https://facebook.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordfacebook"
    },
    {
        title: "Google",
        website: "https://google.com",
        icon: "https://google.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordgoogle"
    },{
        title: "Facebook",
        website: "https://facebook.com",
        icon: "https://facebook.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordfacebook"
    },
    {
        title: "Google",
        website: "https://google.com",
        icon: "https://google.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordgoogle"
    },{
        title: "Facebook",
        website: "https://facebook.com",
        icon: "https://facebook.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordfacebook"
    },
    {
        title: "Google",
        website: "https://google.com",
        icon: "https://google.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordgoogle"
    },
    {
        title: "Facebook",
        website: "https://facebook.com",
        icon: "https://facebook.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordfacebook"
    },
    {
        title: "Google",
        website: "https://google.com",
        icon: "https://google.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordgoogle"
    },{
        title: "Facebook",
        website: "https://facebook.com",
        icon: "https://facebook.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordfacebook"
    },
    {
        title: "Google",
        website: "https://google.com",
        icon: "https://google.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordgoogle"
    },{
        title: "Facebook",
        website: "https://facebook.com",
        icon: "https://facebook.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordfacebook"
    },
    {
        title: "Google",
        website: "https://google.com",
        icon: "https://google.com/favicon.ico",
        username: "wobee13@gmail.com",
        password: "testpasswordgoogle"
    }]

export default function PasswordTable() {
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
                    {TableItems.map((data) => (
                        <TableItem key={data.title} icon={data.icon} title={data.title} password={data.password}
                                   username={data.username} website={data.website}/>
                    ))}
                </Tbody>
            </Table>
        </LightMode>
    );
}

const TableItem = (item: PasswordItemProps) => {
    return (
        <Tr>
            <Td>
                <Link href={item.website} isExternal>
                    <Image src={item.icon} alt={item.title + "logo"} height={8}/>
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