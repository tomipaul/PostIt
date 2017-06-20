import fs from 'fs';
import NodeRSA from 'node-rsa';

const keyDirectory = `${__dirname}/key`;
if ((!process.env.PRIVATE_KEY || !process.env.PUBLIC_KEY)
  && !fs.existsSync(`${keyDirectory}/rsapair.pem`)) {
  const key = new NodeRSA({ b: 2048 });
  const publicKey = JSON.stringify(key.exportKey('pkcs1-public-pem'));
  const privateKey = JSON.stringify(key.exportKey('pkcs1-private-pem'));
  const data = `PRIVATE_KEY = ${privateKey}\nPUBLIC_KEY = ${publicKey}`;
  fs.mkdirSync(keyDirectory);
  fs.writeFileSync(`${keyDirectory}/rsapair.pem`, data);
}
