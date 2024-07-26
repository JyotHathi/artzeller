import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  /****************************** Encryption Service *******************************/
  // THIS WILL BE USED TO STORE THE SESSION VALUES ENCRYPTED IN LOCAL STORAGRE OR SESSION STORAGE
  // THIS WILL BE ALSO USED TO ENCRYPT THE QUERY PARAM AND OTHER REQ HEADERS
  /********************************************************************************/

  secrectKey = 'YOUR_SECRECT_KEY';

  //#region [Data Members]
  key = CryptoJS.SHA256(this.secrectKey);
  iv = CryptoJS.enc.Base64.parse('');
  //#endregion

  //#region [Member funcations]
  toEncrypt = (text: any) => {
    try {
      if (text) {
        return CryptoJS.AES.encrypt(text, this.secrectKey).toString();
      } else {
        return '';
      }
    } catch (error: any) {
      return '';
    }
  };

  /**
   * To decrypted text which is encrypted using encryptFrontEndText function
   * @param text - Encrypted Text which needsto be decrypt required
   * @returns Decrypted text string or empty string if data is not decryptable
   */
  toDecrypt = (text: any) => {
    try {
      if (text) {
        return CryptoJS.AES.decrypt(text, this.secrectKey).toString(
          CryptoJS.enc.Utf8
        );
      } else {
        return '';
      }
    } catch (error: any) {
      return '';
    }
  };
  //#endregion
}
