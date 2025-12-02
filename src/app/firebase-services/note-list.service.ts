import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { collection, doc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  firestore: Firestore = inject(Firestore);

  constructor() {}

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getSingleNoteRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
