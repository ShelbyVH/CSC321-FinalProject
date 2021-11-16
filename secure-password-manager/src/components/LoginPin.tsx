import {
    Text,
    Box,
    Flex,
    Stack,
    Heading,
    useColorModeValue,
    FormControl,
    FormLabel,
    PinInput,
    PinInputField,
    HStack,
    Button, Center
} from "@chakra-ui/react";

export function LoginPin() {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            // bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.300'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Center>
                            <FormControl id="otp">
                                <FormLabel>OTP Code</FormLabel>
                                <HStack spacing={5}>
                                    {/*<Flex>*/}
                                    <PinInput type="number">
                                        <PinInputField/>
                                        <PinInputField/>
                                        <PinInputField/>
                                        <PinInputField/>
                                        <PinInputField/>
                                        <PinInputField/>
                                    </PinInput>
                                    {/*</Flex>*/}
                                </HStack>
                            </FormControl>
                        </Center>
                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}