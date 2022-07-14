# Changes

- if `NEXT_PUBLIC_DEFAULT_TOPIC_QUEST='...'` exists in `.env`, redirect to the quest. And add a list in the header. 
- remove ENS domain entirely, since we want to support more chains instead of ENS.

# Unit Test

Add `mocha` and `chai`. Please refer to [Ethereum Waffle docs](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests).

```
yarn add --dev mocha chai
yarn add --dev @types/mocha
yarn add --dev ethereum-waffle
yarn add --dev ts-node
yarn add --dev typescript
```

- Write test

```ts
import { expect, use } from 'chai';
import { Contract } from 'ethers';
import { MockProvider, solidity} from 'ethereum-waffle';
// import BasicToken from '../build/BasicToken.json';

// use(solidity);

describe('BasicToken', () => {
  const [wallet, walletTo] = new MockProvider().getWallets();
  let token: Contract;

//   beforeEach(async () => {
//     token = await deployContract(wallet, BasicToken, [1000]);
//   });

  it('Assigns initial balance', async () => {
    expect(true);
    // expect(await token.balanceOf(wallet.address)).to.equal(1000);
  });

});
```

- config

package.json
```json
  "scripts": {
    "test": "env TS_NODE_COMPILER_OPTIONS='{\"module\": \"commonjs\" }' mocha"
  },
```

- add a .mocharc.json file in your root directory:

```json
{
  "require": "ts-node/register/transpile-only",
  "spec": "test/**/*.test.{js,ts}"
}
```

- run test

```
yarn test
```


# Proof of Competence

Proof of Competence (PoC) is an open, modular framework to create on-chain quests and on-boarding journeys into Web3. It uses a pluggable task system which can verify that on-chain actions have occurred. This allows to build up reputation or social (DAO) scores that proof an address is familiar with the specified technologies or protocols.

This allows to:
* Create on-boarding quests for developers to learn about a protocol
* Proof an address is competent enough to have a basic understanding of a protocol
* Novel ways to use the social (DAO) scores instead of token-weights for governance


# Quests

Create a quest and define the tasks that are important for your project to help people become more familiar with the protocol. 

## Adding a quest

* A quest should be unique and be used to onboard new people into the space
* Quests are stored in JSON format at `/quests`. 

A quest is defined in the following format
```
{
    "name": "Title of the quest.",
    "description": "A clear and concise description of the quest.",
    "website": "https://website.org/",
    "twitter": "AccountHandle",
    "tasks": []
}
```

Want to submit your own quest to PoC? Feel free to submit a PR/issue.

## Adding a task verifier
 
* A task should be unique
* A task requires a `verifier` in the `/src/verifiers`
* A task should verify information that is publicly available and can be verified by anyone (e.g. on-chain, Subgraphs, or public blockchain explorers) 
* You can specify an amount of points for completing a task
* The verifier returns either a `boolean` or a `number` for each instance the task was completed (e.g. x amount of transactions)

A tasks is defined in the following format
```
{
    "name": "Deploy",
    "description": "Deploy any kind of contract to mainnet.",
    "points": 100,
    "verifier": "deployed-contract",
    "chainId": 1
}
```
*`chainId` is optional and defaults to 1 (mainnet)

You can pass parameters to a verifier to further configure them.
```
{
    "name": "NFT Collector",
    "description": "Get points if you hold this NFT.",
    "points": 100,
    "verifier": "has-nft",
    "params": {
        "addresses": "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b"]
    }
}
```


# PoC API 

The Proof of Competence scores can be integrated into other projects by using the API. There are 2 main endpoints to fetch the quest, as described above, or include the scores from a specific address.

## Endpoints

* GET Quests - [`https://poc.quest/api/quests`](https://poc.quest/api/quests)
* GET Quest - [`https://poc.quest/api/quests/useweb3`](https://poc.quest/api/quests/useweb3)
* GET Score - [`https://poc.quest/api/quests/useweb3/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`](https://poc.quest/api/quests/useweb3/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045) (also supports ENS names)
* POST Claim - [`https://poc.quest/api/quests/poc-poap/claim`](https://poc.quest/api/quests/poc-poap/claim) (also supports ENS names) - depends on the configured reward mechanism
* GET Stats - [`https://poc.quest/api/quests/poc-poap/stats`](https://poc.quest/api/quests/poc-poap/stats)

Example body for Claim POST (also )
```
{
    account: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
}
```

# Development

1. Install all packages `yarn install`

2. Create a `.env` file `touch .env`

3. Add the below configuration to your .env file. You need to request API keys at Alchemy, Etherscan and Infura.

4. Start your project `yarn dev`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables 

Copy the following, incl valid API keys to your `.env` file.
```
NEXT_PUBLIC_ALCHEMY_API_KEY=''
NEXT_PUBLIC_INFURA_API_KEY=''
NEXT_PUBLIC_ETHERSCAN_API_KEY=''
NEXT_PUBLIC_POKT_API_KEY=''

```

### License
[MIT](LICENSE)