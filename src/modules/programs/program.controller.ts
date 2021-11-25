import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { createProgramDto } from './dto/createProgramDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import RequestWithUser from '../auth/authUser.interface';
import { Roles } from 'src/utils/roles.decorator';
import { userRoles } from 'src/utils/constants';
import { RolesGuard } from '../auth/guards/roles-auth.guard';
import { updateProgramDto } from './dto/updateProgramDto';
import { UserService } from '../users/user.service';

@Controller('program')
export class ProgramController {
  constructor(
    private programService: ProgramService,
    private userService: UserService,
  ) {}

  // ADD NEW PROGRAM
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRoles.Couch)
  @UsePipes(ValidationPipe)
  async createProgram(
    @Body() newProgram: createProgramDto,
    @Request() req: RequestWithUser,
  ) {
    // const userData = await this.userService.getUserById(req.user.id);
    // const author = {
    //   firstName: userData.firstName,
    //   lastName: userData.lastName,
    //   email: userData.email,
    //   phone: userData.phone,
    //   role: userData.role.role,
    // };

    const programData = await this.programService.addNewProgram(
      newProgram,
      req.user,
    );

    return programData;
  }

  // GET ALL PROGRAMS
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getAllPrograms() {
    return await this.programService.getAllPrograms();
  }

  // GET PROGRAM BY ID
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getProgramById(@Param('id', ParseIntPipe) id: number) {
    return await this.programService.getProgramById(id);
  }

  // UPDATE PROGRAM
  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRoles.Couch)
  async updateProgram(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedProgram: updateProgramDto,
  ) {
    return await this.programService.updateProgram(id, updatedProgram);
  }

  // DELETE PROGRAM
  @Delete('/:id')
  async removeProgramById(@Param('id', ParseIntPipe) id: number) {
    return await this.programService.deleteProgramById(id);
  }

  // SUBSCRIBE
  // @Post('/subscribe')
  // @UseGuards(JwtAuthGuard)
  // @Roles(userRoles.Athlete)
  // @UsePipes(ValidationPipe)
  // async subscribeToProgram(
  // @Body() programId: number,
  // @Request() req: RequestWithUser,
  // ) {
  // console.log('req.user', req.user);
  // const data = {programId, req.user.id}
  // return await this.programService.subscribeProgram({
  // programId,
  // userId: req.user.id,
  // });
  // }
}
 