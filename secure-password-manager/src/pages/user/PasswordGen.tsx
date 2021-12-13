import {useLocation} from "wouter";
import {useUser} from "use-supabase";
import {
    Box,
    Button,
    Center,
    FormLabel,
    Heading,
    HStack,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Radio,
    RadioGroup,
    Stack,
    Text
} from "@chakra-ui/react";
import {useState} from "react";

export default function PasswordGen() {
    const [generatedpassword, setGeneratedpassword] = useState('')
    const [length, setLength] = useState('6')
    const [minLength, setMinLength] = useState(1)
    const [maxLength, setMaxLength] = useState(128)
    const [type, setType] = useState(1);
    const [location, setLocation] = useLocation();
    if (!useUser) {
        setLocation("/")
    }

    async function genPassword() {
        const url = "https://makemeapassword.ligos.net/api/v1/";
        let style = null;
        const format = "/json";
        let res;
        switch (type) {
            case 1:
                style = "alphanumeric"
                res = await fetch(`${url}${style}${format}?l=${length}`)
                break
            case 2:
                style = "readablepassphrase"
                let strength = "Random"
                if (length == "1") strength = "RandomShort"
                if (length == "2") strength = "RandomLong"
                if (length == "3") strength = "RandomForever"
                res = await fetch(`${url}${style}${format}?s=${strength}&sp=F`)
                break
            case 3:
                style = "pin"
                res = await fetch(`${url}${style}${format}?l=${length}`)
                break
            case 4:
                style = "passphrase"
                res = await fetch(`${url}${style}${format}?wc=${length}&sp=F`)
                break
        }
        if (res) {
            const pass = await res.json()
            setGeneratedpassword(pass.pws[0])
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
                        Password Generator
                    </Heading>
                    <Text color={'gray.500'} fontSize={{base: 'sm', sm: 'md'}}>
                        https://makemeapassword.ligos.net/api used to generate Passwords
                    </Text>
                </Stack>
                <Box as={'form'} mt={10}>
                    <Stack spacing={4}>
                        <HStack>
                            <FormLabel color={'gray.800'}>Length:</FormLabel>
                            <NumberInput defaultValue={12} min={minLength} max={maxLength} w={'full'}
                                         bg={'gray.100'} border={0} color={'gray.500'}
                                         onChange={(num) => setLength(num)} value={length}>
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper color={'gray.800'}/>
                                    <NumberDecrementStepper color={'gray.800'}/>
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                        <RadioGroup defaultValue='Alphanumeric' border={0} color={'gray.500'} size='lg'>
                            <HStack spacing={4}>
                                <FormLabel color={'gray.800'}>Type:</FormLabel>
                                <Radio value='Alphanumeric' bg={'gray.200'} onChange={() => {
                                    setType(1);
                                    setMinLength(1);
                                    setMaxLength(128)
                                }}>Alphanumeric</Radio>
                                <Radio value='Passphrase' bg={'gray.200'} onChange={() => {
                                    setType(2);
                                    setMinLength(1);
                                    setMaxLength(3)
                                }}>Passphrase</Radio>
                                <Radio value='PIN' bg={'gray.200'} onChange={() => {
                                    setType(3);
                                    setMinLength(1);
                                    setMaxLength(128)
                                }}>PIN</Radio>
                                <Radio value='Words' bg={'gray.200'} onChange={() => {
                                    setType(4);
                                    setMinLength(1);
                                    setMaxLength(16)
                                }}>Random Words</Radio>
                            </HStack>
                        </RadioGroup>
                        <HStack>
                            <FormLabel color={'gray.800'}>Result:</FormLabel>
                            <Input
                                bg={'gray.100'}
                                border={0}
                                color={'gray.800'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                                placeholder=''
                                isReadOnly
                                value={generatedpassword}
                            />
                        </HStack>
                    </Stack>
                    <Button
                        fontFamily={'heading'}
                        mt={8}
                        w={'full'}
                        onClick={() => genPassword()}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        color={'white'}
                        _hover={{
                            bgGradient: 'linear(to-r, red.400,pink.400)',
                            boxShadow: 'xl',
                        }}>
                        Generate Password
                    </Button>
                </Box>
            </Stack>
        </Center>
    );
}