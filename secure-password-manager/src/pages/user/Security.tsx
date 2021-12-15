import {useLocation} from "wouter";
import {useUser} from "use-supabase";
import {useState} from "react";
import {
    Box, Button,
    Center,
    FormLabel,
    Heading,
    HStack, Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text
} from "@chakra-ui/react";
import IsPwned from "../../api/HaveIBeenPwned";


export default function Security() {
    const [password, setPassword] = useState('')
    const [result, setResult] = useState('')
    const [show, setShow] = useState(false)
    const [location, setLocation] = useLocation();
    if (!useUser) {
        setLocation("/")
    }

    async function checkPassword() {
        const pw = new IsPwned();

        try {
            await pw.check(password);
        } catch ({count, name}) {
            switch (name) {
                case 'UnexpectedHttpResponseError':
                    // A response other than 200 was received
                    setResult("Error: Unexpected Http Response")
                    break
                case 'TimedOutError':
                    // The timeout was reached
                    setResult("Error: Network TimedOut")
                    break
                case 'InvalidPasswordError':
                    // The password is either not a string or is empty
                    setResult("Error: Invalid Password")
                    break
                case 'BreachedError':
                    // The password has been breached
                    // You can use e.count on this error type
                    setResult(`Password has been breached ${count} times.`);
                    break
                default:
                    setResult(`Password has not been seen in any data breaches.`);
                    break
            }
        }
    }

    return (
        <Center minH={'calc(100vh - 50px)'} bgGradient="linear(to-tr, #283048, #859398)">
            <Stack
                bg={'gray.50'}
                rounded={'xl'}
                p={6}
                m={{base: 4, sm: 6, md: 8}}
                spacing={{base: 8}}>
                <Stack spacing={4}>
                    <Heading
                        color={'gray.800'}
                        lineHeight={1.1}
                        fontSize={{base: 'xl', sm: '2xl', md: '3xl'}}>
                        Password Breach Checker
                    </Heading>
                    <Text color={'gray.500'} fontSize={{base: 'sm', sm: 'md'}}>
                        Uses Have I Been Pwned Api to check if password has been in a data breach.
                    </Text>
                </Stack>
                <Box as={'form'} mt={10}>
                    <Stack spacing={4}>
                        <HStack>
                            <FormLabel color={'gray.800'}>Password:</FormLabel>
                            <InputGroup>
                                <Input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}
                                            bgGradient='linear(to-r, red.400,pink.400)'
                                            _hover={{
                                                bgGradient: 'linear(to-r, red.400,pink.400)',
                                                boxShadow: 'xl',
                                            }}
                                    >
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </HStack>
                        <HStack>
                            <FormLabel color={'gray.800'}>Result:</FormLabel>
                            <Input
                                bg={'gray.100'}
                                border={0}
                                color={'gray.800'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                                isReadOnly
                                value={result}
                            />
                        </HStack>
                    </Stack>
                    <Button
                        fontFamily={'heading'}
                        mt={8}
                        w={'full'}
                        onClick={() => checkPassword()}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        color={'white'}
                        _hover={{
                            bgGradient: 'linear(to-r, red.400,pink.400)',
                            boxShadow: 'xl',
                        }}>
                        Check Password
                    </Button>
                </Box>
            </Stack>
        </Center>
    );
}