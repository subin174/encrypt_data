// encryption.service.ts

import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
// import { Repository } from 'src/repository/main.repository';
import { SettingService } from './setting.service';
import { AccountDto } from 'src/dto/account.dto';
import { Repository } from 'src/repository/main.repository';

@Injectable()
export class EncryptionService {

    constructor(
        private readonly repo: Repository
    ) { }
    private readonly algorithm = 'aes-256-cbc';
    private readonly key = 'hyraholdingshyraholdingssalalala';
    private readonly setting: SettingService;
    private readonly userService = 'aes-256-cbc';

    encryptData(data: string): string {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), iv);
        let encryptedData = cipher.update(data, 'utf8', 'hex');
        encryptedData += cipher.final('hex');
        return iv.toString('hex') + ':' + encryptedData;
    }

    decryptData(encryptedData: string): string {
        const [ivString, encryptedString] = encryptedData.split(':');
        const iv = Buffer.from(ivString, 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key), iv);
        let decryptedData = decipher.update(encryptedString, 'hex', 'utf8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    }

    async encryptUser() {

        let listUser = await this.repo.getListUserEn();
        for (let user of listUser) {
            let userEncrypt = this.encryptData(user.email);
            await this.repo.encryptEmail(user.id, userEncrypt);
        }
        return "Emails encrypted successfully";
    }

    async decryptUser() {

        let listUser = await this.repo.getListUserEn();
        for (let user of listUser) {
            let userEncrypt = this.decryptData(user.email);
            await this.repo.encryptEmail(user.id, userEncrypt);
        }
        return "Emails decrypted successfully";
    }


}
