import {router} from '@/helpers';
import {store} from '@/store';

class Service {
  constructor() {
  }

  async authorization(email, password) {
    let api = this.init(false);
    let encrypt = crypto.createCipheriv('des-ede3', config.secretKey.login, "");
    let pwdEncrypt = encrypt.update(password, 'utf8', 'base64');
    pwdEncrypt += encrypt.final('base64');

    let params = {'email': email, 'password': pwdEncrypt};
    try {
        return await api.post('api/users/v1/login', params);
    } catch (e) {
        throw (this.handleError(e));
    }
}

}

export const service = new Service();
