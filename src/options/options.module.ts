import { Module } from '@nestjs/common';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './options.entity';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [QuestionsModule, TypeOrmModule.forFeature([Option])],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService],
})
export class OptionsModule {}
