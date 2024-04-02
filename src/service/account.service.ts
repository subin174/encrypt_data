import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
    Injectable
} from '@nestjs/common';
import { Repository } from '../repository/main.repository';

@Injectable()
export class AccountService {
    constructor(
        private readonly repository: Repository,
    ) {
    }

    async checkUserPermission(userId: number, roles: string[]) {
        try {
            let list = await this.repository.accountInfor(userId);
            if (!list.length) {
                throw new NotFoundException();
            }
            let user = list[0];
            if (!roles.includes(user?.account_role)) {
                throw new UnauthorizedException();
            }
        } catch (error) {
            throw new BadRequestException('error.user.permission-denied');
        }
    }
}
