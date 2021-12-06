import {Box, Button, Center, Heading, Input, InputGroup, InputRightElement, Stack, Text} from "@chakra-ui/react";
import {useState} from "react";
import {useLocation} from "wouter";

export default function SignUp() {
    const [location, setLocation] = useLocation();
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const handleClick1 = () => setShow1(!show1)
    const handleClick2 = () => setShow2(!show2)
    // const
    return (
        <Center>
            <Stack
                bg={'gray.50'}
                rounded={'xl'}
                p={{base: 4, sm: 6, md: 8}}
                spacing={{base: 8}}
                maxW={{lg: 'lg'}}
            >
                <Stack spacing={4}>
                    <Heading
                        color={'gray.800'}
                        lineHeight={1.1}
                        fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
                        Sign up Now
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            !
                        </Text>
                    </Heading>
                    {/*<Text color={'gray.500'} fontSize={{base: 'sm', sm: 'md'}}>*/}
                    {/*    putF*/}
                    {/*</Text>*/}
                </Stack>
                <Box as={'form'} mt={10}>
                    <Stack spacing={4}>
                        <Input
                            placeholder="Username"
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                        <Input
                            type={"email"}
                            placeholder="firstname@lastname.io"
                            bg={'gray.100'}
                            border={0}
                            color={'gray.500'}
                            _placeholder={{
                                color: 'gray.500',
                            }}
                        />
                        <InputGroup size='md'>
                            <Input
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                                pr='4.5rem'
                                type={show1 ? 'text' : 'password'}
                                placeholder='Enter password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick1}
                                        bgGradient='linear(to-r, red.400,pink.400)'
                                        _hover={{
                                            bgGradient: 'linear(to-r, red.400,pink.400)',
                                            boxShadow: 'xl',
                                        }}
                                >
                                    {show1 ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup size='md'>
                            <Input
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    color: 'gray.500',
                                }}
                                pr='4.5rem'
                                type={show2 ? 'text' : 'password'}
                                placeholder='Confirm password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick2}
                                        bgGradient='linear(to-r, red.400,pink.400)'
                                        _hover={{
                                            bgGradient: 'linear(to-r, red.400,pink.400)',
                                            boxShadow: 'xl',
                                        }}>
                                    {show2 ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Stack>
                    <Button
                        fontFamily={'heading'}
                        mt={8}
                        w={'full'}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        color={'white'}
                        _hover={{
                            bgGradient: 'linear(to-r, red.400,pink.400)',
                            boxShadow: 'xl',
                        }}>
                        Signup
                    </Button>
                    <Button
                        onClick={() => { setLocation("/login")}}
                        fontFamily={'heading'}
                        mt={8}
                        w={'full'}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        color={'white'}
                        _hover={{
                            bgGradient: 'linear(to-r, red.400,pink.400)',
                            boxShadow: 'xl',
                        }}>
                        Already Have an Account Login
                    </Button>
                </Box>
            </Stack>
        </Center>
    )

}