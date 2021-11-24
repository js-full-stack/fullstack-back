// import { Request } from 'typeorm';

import { Request } from '@nestjs/common';
import { User } from '../users/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
