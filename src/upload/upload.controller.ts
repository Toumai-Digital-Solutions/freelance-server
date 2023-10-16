import {
  Controller,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/db/schema/users';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const user: User = req.user;
    return this.uploadService.uploadFile({ file, user });
  }

  @Put(':key')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  replaceFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('key') key: string,
    @Req() req,
  ) {
    const user: User = req.user;
    return this.uploadService.replaceFile({
      key,
      file,
      user,
    });
  }
}
