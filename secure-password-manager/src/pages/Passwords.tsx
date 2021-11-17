import {Box, Flex, FormControl, FormLabel, Input, Text} from "@chakra-ui/react";
// import IsPwned from "../api/HaveIBeenPwned";
//
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

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Box bg={"red"} p={20} borderRadius={10}>
                <Text fontSize={"5xl"}>Passwords</Text>
                <FormControl id="key">
                    <FormLabel>Key</FormLabel>
                    <Input type="text"/>
                </FormControl>
            </Box>
        </Flex>
    )
}