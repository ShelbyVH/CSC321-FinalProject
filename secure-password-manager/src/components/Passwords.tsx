import {
    Box,
    Button,
    Center,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Stack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import {Location, Stronghold} from "tauri-plugin-stronghold-api";
import {useEffect, useState} from "react";
import {useUser} from "use-supabase";
import {useLocation} from "wouter";
import {PasswordItem, PasswordTable} from "./PasswordTable";
// import jsondata from "../api/MOCK_DATA.json"

export default function Passwords() {
    const [newPassword, setNewPassword] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newWebsite, setNewWebsite] = useState('')
    const [routelocation, setLocation] = useLocation()
    const tempArray: PasswordItem[] = []
    const [itemList, setItemList] = useState(tempArray)
    const toast = useToast()
    const {isOpen, onOpen, onClose} = useDisclosure()
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
        readItemsStronghold().catch(e => console.log(e))
        // saveStronghold(JSON.stringify(jsondata)).catch(e => console.log(e))
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
        return JSON.parse(json);
    }

    async function readItemsStronghold() {
        const json = await store.get(location)
        const obj: Array<PasswordItem> = JSON.parse(json)
        setItemList(obj)
    }

    async function handleSubmit() {
        const obj = await readStronghold()
        const item = {
            title: `${newWebsite}`,
            website: `https://${newWebsite}`,
            icon: `https://${newWebsite}/favicon.ico`,
            username: `${newUsername}`,
            password: `${newPassword}`
        }
        obj.push(item);
        await saveStronghold(JSON.stringify(obj))
        setNewPassword('')
        setNewWebsite('')
        setNewUsername('')
    }

    return (
        <Center minH={'calc(100vh - 50px)'} bgGradient="linear(to-tr, #283048, #859398)">
            <Box>
                <Stack
                    bg={'gray.50'}
                    rounded={'md'}
                    p={6}
                    m={{base: 4, sm: 6, md: 8}}
                    spacing={{base: 8}}
                >
                    <HStack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
                            Password List
                        </Heading>
                        <Spacer/>
                        <Button fontFamily={'heading'} w={'30%'}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                color={'white'} onClick={onOpen}
                                _hover={{
                                    bgGradient: 'linear(to-r, red.400,pink.400)',
                                    boxShadow: 'xl',
                                }}>Add Account</Button>
                        <Modal onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay/>
                            <ModalContent>
                                <ModalHeader>Add Account</ModalHeader>
                                <ModalCloseButton/>
                                <ModalBody>
                                    <Stack spacing={4}>
                                        <HStack>
                                            <FormLabel>Website:</FormLabel>
                                            <InputGroup>
                                                <InputLeftAddon children='https://'/>
                                                <Input placeholder="google.com" value={newWebsite}
                                                       onChange={e => setNewWebsite(e.target.value)}/>
                                            </InputGroup>
                                        </HStack>
                                        <HStack>
                                            <FormLabel>Username:</FormLabel>
                                            <Input placeholder="firstname@lastname.io" value={newUsername}
                                                   onChange={e => setNewUsername(e.target.value)}/>
                                        </HStack>
                                        <HStack>
                                            <FormLabel>Password:</FormLabel>
                                            <Input placeholder="Enter password" value={newPassword}
                                                   onChange={e => setNewPassword(e.target.value)}/>
                                        </HStack>
                                    </Stack>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={() => {
                                        handleSubmit().catch(e => console.log(e));
                                        onClose();
                                        toast({
                                            title: 'Account Added.',
                                            // description: "We've created your account for you.",
                                            status: 'success',
                                            duration: 9000,
                                            isClosable: true,
                                        })
                                    }}>Submit</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </HStack>
                    <PasswordTable items={itemList}/>
                </Stack>
            </Box>
        </Center>
    )
}