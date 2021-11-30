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
import { ProgramsForAthletes } from './programsForAthletes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { count } from 'console';

@Controller('program')
export class ProgramController {
  constructor(
    private programService: ProgramService,
    private userService: UserService,
    @InjectRepository(ProgramsForAthletes)
    private programsForAthleteRepository: Repository<ProgramsForAthletes>,
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
    const programData = await this.programService.addNewProgram(
      newProgram,
      req.user,
    );

    return programData;
  }

  // GET ALL PROGRAMS
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllPrograms(@Request() req: RequestWithUser) {
    if (req.user.role.role === 'couch') {
      const programs = await this.programService.getProgramsForAuthor(req.user);

      const programsForAthlete = programs.map(
        ({ program, isAnySubscribers }) => {
          return {
            id: program.id,
            name: program.name,
            description: program.description,
            duration: program.duration,
            price: program.price,
            createdAt: program.createdAt,
            updatedAt: program.updatedAt,
            author: program.author,
            isAnySubscribers,
          };
        },
      );
      return programsForAthlete;
    } else {
      const programs = await this.programService.getProgramsForUser(req.user);

      const programsForAthlete = programs.map(({ program, isSubscribe }) => {
        return {
          id: program.id,
          name: program.name,
          description: program.description,
          duration: program.duration,
          price: program.price,
          createdAt: program.createdAt,
          updatedAt: program.updatedAt,
          author: program.author,
          isSubscribe,
        };
      });
      return programsForAthlete;
    }
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
  @Post('/subscribe')
  @UseGuards(JwtAuthGuard)
  @Roles(userRoles.Athlete)
  async subscribeToProgram(
    @Body() { programId },
    @Request() req: RequestWithUser,
  ) {
    return await this.programService.subscribeUserToProgram({
      userId: req.user.id,
      programId,
    });
  }

  // UNSUBSCRIBE
  @Delete('/unsubscribe/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(userRoles.Athlete)
  async unsubscribeFromProgram(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return await this.programService.ubsubscribeUserFromProgram({
      userId: req.user.id,
      programId: id,
    });
  }
}
 