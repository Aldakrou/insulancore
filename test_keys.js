const k1 = ['QUl6YVN5QW5CNTM=', 'TXVWNUF5aGs4', 'WjdWVEQ1RXo5', 'amlXakZCWmU4QQ=='].map(s => Buffer.from(s, 'base64').toString()).join('');
const k2 = ['QUl6YVN5REE', '3S21Pel83en', 'ZWcU84YURwWG', '9vQVQyTm9JSG', 'ZKNXlj'].join('');
const k2Decoded = Buffer.from(k2, 'base64').toString();
const k3 = ['QUl6YVN5QW4', 'tQ3dmOXhrT', 'TIxWXNsXzFTRC', '1YV0FaY2xy', 'czNNWnlJ'].join('');
const k3Decoded = Buffer.from(k3, 'base64').toString();

console.log("Key 1:", k1);
console.log("Key 2:", k2Decoded);
console.log("Key 3:", k3Decoded);
