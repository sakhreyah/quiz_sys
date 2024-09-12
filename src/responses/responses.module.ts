import { Module } from '@nestjs/common';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './responses.entity';
import { OptionsModule } from 'src/options/options.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    QuizzesModule,
    QuestionsModule,
    OptionsModule,
    TypeOrmModule.forFeature([Response]),
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
  exports: [ResponsesService],
})
export class ResponsesModule {}
