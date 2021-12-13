import {
    Box,
    Center,
    Heading,
    Stack,
} from "@chakra-ui/react";
import {Location, Stronghold} from "tauri-plugin-stronghold-api";
import {useEffect, useState} from "react";
import {useUser} from "use-supabase";
import {useLocation} from "wouter";
import PasswordTable from "./PasswordTable";

// const pw = new IsPwned();
// // console.log(pw.hashPassword('1234'));
//
// try {
//     await pw.check('PASSWORD');
// } catch ({count, name}) {
//     switch (name) {
//         case 'UnexpectedHttpResponseError':
//         // A response other than 200 was received
//         case 'TimedOutError':
//         // The timeout was reached
//         case 'InvalidPasswordError':
//         // The password is either not a string or is empty
//         case 'BreachedError':
//             // The password has been breached
//             // You can use e.count on this error type
//             console.log(`Password has been breached ${count} times.`);
//     }
// }
export default function Passwords() {
    const [routelocation, setLocation] = useLocation();
    const [passwords, setPasswords] = useState('')
    const [input, setInput] = useState('')
    const [data, setData] = useState({})
    const user = useUser()
    var strongHoldPath = "example.stronghold";
    var strongHoldPassword = "password";
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
    // stronghold.onStatusChange((status: { snapshot: { status: string } }) => {
    //     // Stronghold Status Change Log
    //     console.log('got new stronghold status: ' + status.snapshot.status)
    // })

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
        setPasswords(await store.get(location))
    }


    return (
        <Center minH={'calc(100vh - 50px)'} bgGradient="linear(to-tr, #283048, #859398)">
            <Box>
                {/*<Text>Output: {passwords}</Text>*/}
                {/*/!*<Text>{input}</Text>*!/*/}
                {/*<Input*/}
                {/*    type="text"*/}
                {/*    value={input}*/}
                {/*    onChange={*/}
                {/*        e => setInput(e.target.value)*/}
                {/*    }*/}
                {/*/>*/}
                {/*<Button*/}
                {/*    onClick={() => {*/}
                {/*        saveStronghold(input).then(r => readStronghold())*/}
                {/*        setInput('')*/}
                {/*    }}*/}
                {/*    fontFamily={'heading'}*/}
                {/*    mt={8}*/}
                {/*    w={'full'}*/}
                {/*    bgGradient="linear(to-r, red.400,pink.400)"*/}
                {/*    color={'white'}*/}
                {/*    _hover={{*/}
                {/*        bgGradient: 'linear(to-r, red.400,pink.400)',*/}
                {/*        boxShadow: 'xl',*/}
                {/*    }}>*/}
                {/*    Submit*/}
                {/*</Button>*/}
                <Stack
                    bg={'gray.50'}
                    rounded={'md'}
                    p={6}
                    m={{base: 4, sm: 6, md: 8}}
                    spacing={{base: 8}}
                >
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{base: 'xl', sm: '2xl', md: '3xl'}}>
                            Password List
                        </Heading>
                        {/*<Text color={'gray.500'} fontSize={{base: 'sm', sm: 'md'}}>*/}
                        {/*    putF*/}
                        {/*</Text>*/}
                    </Stack>
                    <PasswordTable/>
                </Stack>
            </Box>
        </Center>
    )
}