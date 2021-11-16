import {
    Box,
    Stack,
    Heading,
    Text,
    SimpleGrid,
} from '@chakra-ui/react';
import SignUp from "../components/SignUp";

export default function Welcome() {
    return (
        <Box p={"10%"}>
            <SimpleGrid columns={2}>
                <Stack spacing={{base: 10, md: 20}}>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{base: '3xl', sm: '4xl', md: '5xl', lg: '6xl'}}>
                        Senior web designers{' '}
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            &
                        </Text>{' '}
                        Full-Stack Developers
                    </Heading>
                </Stack>
                <SignUp />
            </SimpleGrid>
        </Box>
    );
}