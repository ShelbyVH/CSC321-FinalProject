import {Stronghold, Location} from "tauri-plugin-stronghold-api/webview-dist";


const stronghold = new Stronghold('./example.stronghold', 'password')
const store = stronghold.getStore('exampleStore', [])
const vault = stronghold.getVault('exampleVault', [])
const location = Location.generic('vault', 'record')
stronghold.onStatusChange((status: { snapshot: { status: string } }) => {
    console.log('got new stronghold status: ' + status.snapshot.status)
})
let record: any;

_runProcedures().then(() => console.log('procedures finished')).catch(e => console.log('error running procedures: ' + e))

async function _runProcedures() {
    const seedLocation = Location.generic('vault', 'seed')
    await vault.generateBIP39(seedLocation)
    const privateKeyLocation = Location.generic('vault', 'derived')
    await vault.deriveSLIP10([0, 0, 0], 'Seed', seedLocation, privateKeyLocation)
    const publicKey = await vault.getPublicKey(privateKeyLocation)
    console.log('got public key ' + publicKey)
    const message = 'Tauri + Stronghold!'
    const signature = await vault.sign(privateKeyLocation, message)
    console.log(`Signed "${message}" and got sig "${signature}"`)
}

async function save() {
    await store.insert(location, record)
    await stronghold.save()
}

function read() {
    console.log(store.get(location));
}