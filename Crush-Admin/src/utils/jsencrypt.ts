// 1. 引入路径改为直接引入包名，不要带 /bin/jsencrypt.min
import JSEncrypt from 'jsencrypt';

// 密钥对生成 http://web.chacuo.net/netrsakeypair

// 2. 建议使用模板字符串（反引号），省去繁琐的 + 号和 \n
const publicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKoR8mX0rGKLqzcWmOzbfj64K8ZIgOdH
nzkXSOVOZbFu/TJhZ7rFAN+eaGkl3C4buccQd/EjEsj9ir7ijT7h96MCAwEAAQ==`;

const privateKey = `MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAqhHyZfSsYourNxaY
7Nt+PrgrxkiA50efORdI5U5lsW79MmFnusUA355oaSXcLhu5xxB38SMSyP2KvuKN
PuH3owIDAQABAkAfoiLyL+Z4lf4Myxk6xUDgLaWGximj20CUf+5BKKnlrK+Ed8gA
kM0HqoTt2UZwA5E2MzS4EI2gjfQhz5X28uqxAiEA3wNFxfrCZlSZHb0gn2zDpWow
cSxQAgiCstxGUoOqlW8CIQDDOerGKH5OmCJ4Z21v+F25WaHYPxCFMvwxpcw99Ecv
DQIgIdhDTIqD2jfYjPTY8Jj3EDGPbH2HHuffvflECt3Ek60CIQCFRlCkHpi7hthh
YhovyloRYsM+IS9h/0BzlEAuO0ktMQIgSPT3aFAgJYwKpqRYKlLDVcflZFCKY7u3
UP8iWi1Qw0Y=`;

/**
 * RSA 加密
 * @param txt 需要加密的明文
 * @returns 加密后的密文，加密失败返回 false
 */
// 3. 补充 TypeScript 参数和返回值类型
export function encrypt(txt: any): string | false {
	const encryptor = new JSEncrypt();
	encryptor.setPublicKey(publicKey); // 设置公钥
	return encryptor.encrypt(txt); // 对数据进行加密
}

/**
 * RSA 解密
 * @param txt 需要解密的密文
 * @returns 解密后的明文，解密失败返回 false
 */
export function decrypt(txt: string): string | false {
	const encryptor = new JSEncrypt();
	encryptor.setPrivateKey(privateKey); // 设置私钥
	return encryptor.decrypt(txt); // 对数据进行解密
}
