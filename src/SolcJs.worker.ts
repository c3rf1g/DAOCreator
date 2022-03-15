/* eslint-disable no-restricted-globals */


importScripts(
    'https://solc-bin.ethereum.org/bin/soljson-v0.8.6+commit.11564f7e.js'
);

ctx.addEventListener('message', ({ data }) => {
    const solc = wrapper((ctx as any).Module);
    console.log("asd")
    const compileResult = solc.compile(
        createCompileInput(data.contractFileName, data.content)
    );
    ctx.postMessage(compileResult);
});

