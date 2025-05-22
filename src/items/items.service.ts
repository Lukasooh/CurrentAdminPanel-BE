import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service'; // Adjust path if needed

@Injectable()
export class ItemsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  private collection() {
    return this.firebaseService.getCollection('Users'); // Your dynamic collection
  }

  async create(data: any) {
    const email = data.email;
    const docRef = this.collection().doc(email);
    await docRef.set(data);
    console.log('Document written with ID: ', email);
    return { id: email, ...data };
  }

  async findAll() {
    const snapshot = await this.collection().get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const doc = await this.collection().doc(id).get();
    
    console.log('Document data:', doc.data());
    if (!doc.exists) throw new NotFoundException('Item not found');
    const data = doc.data();
    const { email, firstName, lastName, password, role} = data || {};
    
    return { id: doc.id,     
      email,
      firstName,
      lastName,
      password,
      role,
    };
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