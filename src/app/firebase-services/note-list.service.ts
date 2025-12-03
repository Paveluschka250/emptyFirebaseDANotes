import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import {
  collection,
  doc,
  Firestore,
  collectionData,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  unsubTrash;
  unsubNotes;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNotesList();
  }

  async deleteNote(colId: "notes" | "trash", docId: string) {
    await deleteDoc(this.getSingleNoteRef(colId, docId))
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        console.log('Note deleted successfully');
      });
  }

  async updateNote(note: Note) {
    if (note.id) {
      let docRef = this.getSingleNoteRef(this.getColIdFromNote(note), note.id);
      await updateDoc(docRef, this.getCleanJson(note))
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          console.log('Note updated successfully');
        });
    }
  }

  getCleanJson(note: Note) {
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked: note.marked,
    };
  }

  getColIdFromNote(note: Note) {
    if (note.type == 'note') {
      return 'notes';
    } else {
      return 'trash';
    }
  }

  async addNote(item: Note, colId: "notes" | "trash") {
    const collectionRef = colId === "notes" ? this.getNotesRef() : this.getTrashRef();
    await addDoc(collectionRef, this.getCleanJson(item))
      .catch((err) => {
        console.log(err);
      })
      .then((docRef) => {
        console.log('Note added successfully', docRef?.id);
      });
  }

  ngOnDestroy() {
    this.unsubTrash();
    this.unsubNotes();
  }

  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = [];
      list.forEach((element) => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }

  subNotesList() {
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [];
      list.forEach((element) => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      });
    });
  }

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id,
      type: obj.type || 'note',
      title: obj.title || '',
      content: obj.content || '',
      marked: obj.marked || false,
    };
  }

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
