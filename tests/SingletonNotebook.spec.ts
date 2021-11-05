import { Notebook } from '../src/singleton/Notebook';
import { expect } from 'chai';
import { NoteProxy as Note } from '../src/singleton/Note';

// describe('Notebook.create', () => {
//   it('#new: Automaticly register itself updating the Notebook notes and dictionary when instanciated.', () => {
//     const note = Notebook.create('Title', 'content');
//     expect(Notebook.dictionary.size).to.equal(1);
//     expect(Notebook.notes.size).to.equal(1);
//     // do it twice and it must keep the same values because the note has the same title.
//     const noteCopy = Notebook.create('Title', 'content');
//     expect(Notebook.dictionary.size).to.equal(1);
//     expect(Notebook.notes.size).to.equal(1);
//   });
//   it('#update: Automaticly updates the Notebook notes and dictionary when updated.', () => {
//     const note = Notebook.create('Title', 'content');
//     expect(Notebook.dictionary.size).to.equal(1);
//     expect(Notebook.notes.size).to.equal(1);
//     const noteUpdate = Notebook.create('Title', 'content foo');
//     expect(Notebook.dictionary.size).to.equal(2);
//     expect(Notebook.notes.size).to.equal(1);
//     expect(noteUpdate).to.equal(note);
//     expect(noteUpdate === note).to.equal(true);
//   });
// });


describe('Note', () => {
  it('#new: Automaticly register itself updating the Notebook notes and dictionary when instanciated.', () => {
    const note = new Note('Title', 'content');
    // console.log(note);
    expect(Notebook.dictionary.size).to.equal(1);
    expect(Notebook.notes.size).to.equal(1);
    // do it twice and it must keep the same values because the note has the same title.
    const noteCopy = new Note('Title', 'content');
    expect(Notebook.dictionary.size).to.equal(1);
    expect(Notebook.notes.size).to.equal(1);
  });
  it('#update: Automaticly updates the Notebook notes and dictionary when updated.', () => {
    const note = new Note('Title', 'content');
    expect(Notebook.dictionary.size).to.equal(1);
    expect(Notebook.notes.size).to.equal(1);
    const noteUpdate = new Note('Title', 'content foo');
    expect(Notebook.dictionary.size).to.equal(2);
    expect(Notebook.notes.size).to.equal(1);
    expect(noteUpdate).to.equal(note);
    expect(noteUpdate === note).to.equal(true);
  });
});

