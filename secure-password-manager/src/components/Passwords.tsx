import {Box, Button, Center, Input, Text} from "@chakra-ui/react";
import {Location, Stronghold} from "tauri-plugin-stronghold-api";
import {useEffect, useState} from "react";

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
    const [passwords, setPasswords] = useState('')
    const [input, setInput] = useState('');


    const stronghold = new Stronghold('./store.stronghold', 'password')
    const store = stronghold.getStore('Store', [])
    const vault = stronghold.getVault('Vault', [])
    const location = Location.generic('vault', 'record')
    // stronghold.onStatusChange((status: { snapshot: { status: string } }) => {
    //     // Stronghold Status Change Log
    //     console.log('got new stronghold status: ' + status.snapshot.status)
    // })

    useEffect (() => {
        InitStronghold().then(() => console.log('procedures finished')).catch(e => console.log('error running procedures: ' + e))
    },[])


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
            <Box p={0} borderRadius={0}>
                <Text>Output: {passwords}</Text>
                {/*<Text>{input}</Text>*/}
                <Text fontSize={"5xl"}>Passwords</Text>
                <Input
                    type="text"
                    value={input}
                    onChange={
                        e => setInput(e.target.value)
                    }
                />
                <Button
                    onClick={() => {
                        saveStronghold(input).then(r => readStronghold())
                        setInput('')
                    }}
                    fontFamily={'heading'}
                    mt={8}
                    w={'full'}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    color={'white'}
                    _hover={{
                        bgGradient: 'linear(to-r, red.400,pink.400)',
                        boxShadow: 'xl',
                    }}>
                    Submit
                </Button>
                {/*<PasswordTable/>*/}
            </Box>
        </Center>
    )
}