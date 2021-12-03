import {
    Box,
    Stack,
    Heading,
    Text,
    SimpleGrid,
    Center, Grid,
} from '@chakra-ui/react';
import SignUp from "../components/SignUp";

export default function Welcome() {
    return (
        <Box>
            <Grid minH="100vh" columns={1}>
                <SimpleGrid columns={2} spacing={8} padding={16}>
                    <Center>
                        <Stack>
                            <Heading
                                lineHeight={1.1}
                                fontSize={{base: '3xl', sm: '4xl', md: '5xl', lg: '6xl'}}>
                                Secure Password Manager using{' '}
                                <Text
                                    as={'span'}
                                    bgGradient="linear(to-r, red.400,pink.400)"
                                    bgClip="text">
                                    IOTA Stronghold
                                </Text>{' '}
                                for secure encryption and storage of user credentials
                            </Heading>
                        </Stack>
                    </Center>
                    <SignUp/>
                </SimpleGrid>
            </Grid>
        </Box>
    );
}