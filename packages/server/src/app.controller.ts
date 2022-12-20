import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('input/:id')
  input(@Param('id') id: string) {
    return this.appService.input(id);
  }

  @Post('validate/:id')
  validate(@Param('id') id: string) {
    return this.appService.validateId(id);
  }

  @Get('data')
  data() {
    return this.appService.getData();
  }

  @Get('library')
  library() {
    return this.appService.getLibrary();
  }
}
