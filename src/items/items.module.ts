import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { FirebaseModule } from '../firebase/firebase.module';


@Module({
    imports: [FirebaseModule],
    controllers: [ItemsController],
    providers: [ItemsService],
    exports: [ItemsService], // Exporting ItemsService for use in other modules
})
export class ItemsModule {}
