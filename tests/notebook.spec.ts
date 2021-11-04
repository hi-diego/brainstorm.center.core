import Notebook from "../src/Notebook";
import Note from "../src/Note";
import { expect } from 'chai';

console.log("Notebook", Notebook);
describe("Notebook", () => {
  it("#new", () => {
    const notebook = new Notebook();
    expect(notebook.dictionary.size).to.equal(0);
    expect(notebook.notes.size).to.equal(0);
  });
  it("#update", () => {
    const _ = new Notebook();
    const note = new Note('title', 'content');
    const notebook = _.update(note);
    expect(notebook.dictionary.size).to.equal(1);
    expect(notebook.notes.size).to.equal(1);
  });
  it("#add", () => {
    const _ = new Notebook();
    const note = new Note('title', 'content');
    const _note = new Note('title2', 'title content');
    const __ = _.update(note);
    const notebook = __.update(_note);
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
  it("#remove words, mentionds and references", () => {
    const _ = new Notebook();
    const note = new Note('title', 'content');
    const _note = new Note('title2', 'title content');
    const _noteUpdate = new Note('title2', 'content');
    const __ = _.update(note);
    const ___ = __.update(_note);
    const notebook = ___.update(_noteUpdate);
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
});

