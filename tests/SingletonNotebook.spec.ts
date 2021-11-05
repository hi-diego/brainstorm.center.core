import { SingletonNotebook } from '../src/proxy/SingletonNotebook';
import { NoteProxy } from '../src/proxy/NoteProxy';
import { expect } from 'chai';

describe('NoteProxy', () => {
  it('#new: Automaticly register itself updating the SingletonNotebook notes and dictionary when instanciated.', () => {
    const note = new NoteProxy('Title', 'content');
    expect(SingletonNotebook.dictionary.size).to.equal(1);
    expect(SingletonNotebook.notes.size).to.equal(1);
    // do it twice and it must keep the same values because the note has the same title.
    const noteCopy = new NoteProxy('Title', 'content');
    expect(SingletonNotebook.dictionary.size).to.equal(1);
    expect(SingletonNotebook.notes.size).to.equal(1);
  });
  it('#update: Automaticly updates the SingletonNotebook notes and dictionary when updated.', () => {
    const note = new NoteProxy('Title', 'content');
    expect(SingletonNotebook.dictionary.size).to.equal(1);
    expect(SingletonNotebook.notes.size).to.equal(1);
    const noteUpdate = new NoteProxy('Title', 'content foo');
    expect(SingletonNotebook.dictionary.size).to.equal(2);
    expect(SingletonNotebook.notes.size).to.equal(1);
  });
  // it('#update: Automaticly updates the SingletonNotebook notes and dictionary when updated.', () => {
  //   const note = new NoteProxy('Title2', 'content');
  //   expect(SingletonNotebook.dictionary.size).to.equal(2);
  //   expect(SingletonNotebook.notes.size).to.equal(2);
  // });
});

