import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ReconciliationService } from './reconciliation.service';

@Controller('reconcile')
export class ReconciliationController {
  constructor(private readonly reconciliationService: ReconciliationService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'fileA', maxCount: 1 },
      { name: 'fileB', maxCount: 1 },
    ]),
  )
  async reconcile(
    @UploadedFiles()
    files: {
      fileA?: Express.Multer.File[];
      fileB?: Express.Multer.File[];
    },
  ) {
    const fileA = files.fileA?.[0];
    const fileB = files.fileB?.[0];

    console.log('entered controller...');

    if (!fileA || !fileB) {
      throw new Error('Both files are required');
    }

    const result = await this.reconciliationService.reconcile(fileA, fileB);
    return result;
  }
}
