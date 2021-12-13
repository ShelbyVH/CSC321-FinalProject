import {useLocation} from "wouter";
import {useUser} from "use-supabase";
import {Box, Center, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export default function PasswordGen() {
    const [location, setLocation] = useLocation();
    if (!useUser) {setLocation("/")}

    return (
        <Center minH={'calc(100vh - 50px)'} bgGradient="linear(to-tr, #283048, #859398)">
            <Box p={0} borderRadius={0} >
                <Text fontSize={"5xl"}>Passwords</Text>
                <FormControl id="key">
                    <FormLabel>Key</FormLabel>
                    <Input type="text"/>
                </FormControl>
            </Box>
        </Center>
    );
}