const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error("Incorrect arguments!");
    return this.process(message, key, "encrypt");
  }

  decrypt(message, key) {
    if (!message || !key) throw new Error("Incorrect arguments!");
    return this.process(message, key, "decrypt");
  }

  process(message, key, mode) {
    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      if (this.alphabet.includes(char)) {
        const messageIndex = this.alphabet.indexOf(char);
        const keyIndexValue = this.alphabet.indexOf(key[keyIndex % key.length]);

        let cipherIndex;
        if (mode === "encrypt") {
          cipherIndex = (messageIndex + keyIndexValue) % this.alphabet.length;
        } else {
          cipherIndex =
            (messageIndex - keyIndexValue + this.alphabet.length) %
            this.alphabet.length;
        }

        result += this.alphabet[cipherIndex];
        keyIndex++;
      } else {
        result += char;
      }
    }

    if (!this.isDirect) {
      result = result.split("").reverse().join("");
    }

    return result;
  }
}

module.exports = {
  VigenereCipheringMachine,
};
