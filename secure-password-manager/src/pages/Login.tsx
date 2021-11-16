import {Box} from "@chakra-ui/react";
import {LoginPin} from "../components/LoginPin";


export default function Login() {
    return (
        <Box
            // textAlign="center"
            // fontSize="5xl"
            // fontWeight="bold"
            // bgGradient="linear(to-tr, #283048, #859398)"
        >
            {/*<Grid minH="100vh" p={3}>*/}
            {/*<LoginCard/>*/}
            <LoginPin/>
            {/*</Grid>*/}
        </Box>
    );
}
