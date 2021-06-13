import {Injectable} from '@nestjs/common';
import {UploadDto} from './upload.dto';
import {AppConfigService} from '../app-config/app-config.service';

@Injectable()
export class UploadService {
    constructor(private config: AppConfigService) {
    }

    uploadImage(request: UploadDto) {
        return {
            filename: request.file.filename,
            mimetype: request.file.mimetype,
        };
    }
}
