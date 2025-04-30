import { Injectable } from '@nestjs/common';

import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class PostsService {
  constructor(private firebaseRepository: FirebaseService) {}
}