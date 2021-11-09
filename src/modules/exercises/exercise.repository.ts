import { EntityRepository, Repository } from 'typeorm';
import { Exercise } from './exercise.entity';

@EntityRepository(Exercise)
export class ExerciseRepo extends Repository<Exercise> {}
