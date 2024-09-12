import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './scores.entity';
import { UsersModule } from 'src/users/users.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { ResponsesModule } from 'src/responses/responses.module';

@Module({
  imports: [
    UsersModule,
    QuizzesModule,
    ResponsesModule,
    TypeOrmModule.forFeature([Score]),
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
