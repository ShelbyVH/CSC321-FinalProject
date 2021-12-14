import {useLocation} from "wouter";
import {useUser} from "use-supabase";

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

export default function Security() {
    const [location, setLocation] = useLocation();
    if (!useUser) {setLocation("/")}
    return <h1>Security</h1>;
}