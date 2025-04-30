import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service'; // Adjust path if needed

@Injectable()
export class ItemsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  private collection() {
    return this.firebaseService.getCollection('items'); // Your dynamic collection
  }

  async create(data: any) {
    const docRef = await this.collection().add(data);
    return { id: docRef.id, ...data };
  }

  async findAll() {
    const snapshot = await this.collection().get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const doc = await this.collection().doc(id).get();
    if (!doc.exists) throw new NotFoundException('Item not found');
    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, data: any) {
    await this.collection().doc(id).update(data);
    return { id, ...data };
  }

  async remove(id: string) {
    await this.collection().doc(id).delete();
    return { message: `Deleted item ${id}` };
  }
}