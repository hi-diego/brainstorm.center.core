import Notebook from '../src/Notebook';
import Note from '../src/Note';
import { expect } from 'chai';

// console.log('Notebook', Notebook);
describe('Notebook', () => {
  it('#new', () => {
    const notebook = new Notebook();
    expect(notebook.dictionary.size).to.equal(0);
    expect(notebook.notes.size).to.equal(0);
  });
  it('#update', () => {
    const notebook = new Notebook().update(new Note('title', 'content'));
    expect(notebook.dictionary.size).to.equal(1);
    expect(notebook.notes.size).to.equal(1);
  });
  it('#add', () => {
    const note = new Note('title', 'content');
    const _note = new Note('title2', 'title content');
    const notebook = new Notebook().update(note).update(_note);
    const wordSet = notebook.dictionary.get('content');

    expect(notebook.notes.size).to.equal(2);
    expect(notebook.dictionary.size).to.equal(2);
    expect(wordSet).to.not.equal(undefined);
    expect(wordSet).to.not.equal(null);
    if (wordSet) expect(wordSet.size).to.equal(2);

    expect(notebook.references(note).size).to.equal(1);
    expect(notebook.mentions(_note).size).to.equal(1);

    expect(notebook.references(_note).size).to.equal(0);
    expect(notebook.mentions(note).size).to.equal(0);
  });
  it('#remove words, mentionds and references', () => {
    const note = new Note('title', 'content');
    const _note = new Note('title2', 'title content');
    const _noteUpdate = new Note('title2', 'content');
    const notebook = new Notebook().update(note).update(_note).update(_noteUpdate);
    const wordSet = notebook.dictionary.get('content');

    expect(notebook.notes.size).to.equal(2);
    expect(notebook.dictionary.size).to.equal(1);
    expect(wordSet).to.not.equal(undefined);
    expect(wordSet).to.not.equal(null);
    if (wordSet) expect(wordSet.size).to.equal(2);

    expect(notebook.references(note).size).to.equal(0);
    expect(notebook.mentions(_noteUpdate).size).to.equal(0);

    expect(notebook.references(_noteUpdate).size).to.equal(0);
    expect(notebook.mentions(note).size).to.equal(0);
  });
  it('#create mentions correctly', () => {
    const note = new Note('Functional programming', 'In computer science, functional programming is a programming paradigm where programs are constructed by applying and composing functions.');
    const note2 = new Note('Functions', 'In computer programming, a subroutine is a sequence of program instructions that performs a specific task, packaged as a unit.');
    const notebook = new Notebook().update(note).update(note2);
    // Get mentions
    
    expect(notebook.references(note).size).to.equal(0);
    expect(notebook.mentions(note).size).to.equal(1);

    expect(notebook.references(note2).size).to.equal(1);
    expect(notebook.mentions(note2).size).to.equal(0);
  });
});

