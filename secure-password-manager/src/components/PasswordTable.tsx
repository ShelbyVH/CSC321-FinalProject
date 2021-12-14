import {
    Table, Tbody, Td,
    Th, Thead, Tr,
    Image, Popover,
    PopoverTrigger, Button,
    PopoverContent, PopoverHeader,
    PopoverCloseButton, PopoverArrow,
    LightMode, DarkMode, Link, Spinner
} from "@chakra-ui/react";
import {Location, Stronghold} from "tauri-plugin-stronghold-api";
import {useEffect, useState} from "react";
import {useUser} from "use-supabase";
import {useLocation} from "wouter";

interface PasswordItem {
    title: string;
    website: string;
    icon: string;
    username: string;
    password: string;
}

const TableItems: Array<PasswordItem> = [
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }, {
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
    }
]

export default function PasswordTable() {
    const [routelocation, setLocation] = useLocation()
    const user = useUser()
    let strongHoldPath = "example.stronghold";
    let strongHoldPassword = "password";
    if (user) {
        strongHoldPath = user.email + ".stronghold"
        strongHoldPassword = user.id;
    } else {
        setLocation("/")
    }

    const stronghold = new Stronghold(strongHoldPath, strongHoldPassword)
    const store = stronghold.getStore('Store', [])
    const vault = stronghold.getVault('Vault', [])
    const location = Location.generic('vault', 'record')

    useEffect(() => {
        InitStronghold().then(() => console.log('procedures finished')).catch(e => console.log('error running procedures: ' + e))
        readStronghold().catch(e => console.log(e))
    }, [])


    async function InitStronghold() {
        const seedLocation = Location.generic('vault', 'seed')
        await vault.generateBIP39(seedLocation)
        const privateKeyLocation = Location.generic('vault', 'derived')
        await vault.deriveSLIP10([0, 0, 0], 'Seed', seedLocation, privateKeyLocation)
        const publicKey = await vault.getPublicKey(privateKeyLocation)
        console.log('got public key ' + publicKey)
        const message = 'Tauri + Stronghold!'
        const signature = await vault.sign(privateKeyLocation, message)
        console.log(`Signed "${message}" and got sig "${signature}"`)
    }

    async function saveStronghold(record: string) {
        await store.insert(location, record)
        await stronghold.save()
    }

    async function readStronghold() {
        const json = await store.get(location)
        const obj: Array<PasswordItem> = JSON.parse(json)
        return obj;
    }
    let passwords: Array<PasswordItem> = [];
    const [test, setTest] = useState(passwords)

    readStronghold().then(r =>setTest(r));
    if (test.length < 0) {
        return <Spinner />;
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
                        {test.map((data: PasswordItem) => (
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
                    <Image src={item.icon} height={8}/>
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