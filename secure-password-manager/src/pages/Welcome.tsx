import {Box, Flex, Text} from "@chakra-ui/react"

function Welcome() {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Box bg={"red"} p={20} borderRadius={10}>
                <Text fontSize={"5xl"}>Welcome</Text>
            </Box>
        </Flex>
    )
}


export default Welcome