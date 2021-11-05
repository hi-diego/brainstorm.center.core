import { SingletonNotebook } from '../src/proxy/SingletonNotebook';
import { NoteProxy } from '../src/proxy/NoteProxy';
import { expect } from 'chai';

describe('NoteProxy', () => {
  it('#new: Automaticly register itself updating the SingletonNotebook notes and dictionary when instanciated.', () => {
    const note = SingletonNotebook.create('Title', 'content');
    expect(SingletonNotebook.dictionary.size).to.equal(1);
    expect(SingletonNotebook.notes.size).to.equal(1);
    // do it twice and it must keep the same values because the note has the same title.
    const noteCopy = SingletonNotebook.create('Title', 'content');
    expect(SingletonNotebook.dictionary.size).to.equal(1);
    expect(SingletonNotebook.notes.size).to.equal(1);
  });
  it('#update: Automaticly updates the SingletonNotebook notes and dictionary when updated.', () => {
    const note = SingletonNotebook.create('Title', 'content');
    expect(SingletonNotebook.dictionary.size).to.equal(1);
    expect(SingletonNotebook.notes.size).to.equal(1);
    const noteUpdate = SingletonNotebook.create('Title', 'content foo');
    console.log(SingletonNotebook.dictionary.toArray());
    expect(SingletonNotebook.dictionary.size).to.equal(2);
    expect(SingletonNotebook.notes.size).to.equal(1);
    expect(noteUpdate).to.equal(note);
  });
  // it('#update: Automaticly updates the SingletonNotebook notes and dictionary when updated.', () => {
  //   const note = new NoteProxy('Title2', 'content');
  //   expect(SingletonNotebook.dictionary.size).to.equal(2);
  //   expect(SingletonNotebook.notes.size).to.equal(2);
  // });
});

