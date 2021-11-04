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
    const notebook = new Notebook();
    const note = new Note('title', 'content');
    const _notebook = notebook.update(note);
    expect(_notebook.dictionary.size).to.equal(1);
    expect(_notebook.notes.size).to.equal(1);
  });
  it("#add", () => {
    const notebook = new Notebook();
    const note = new Note('title', 'content');
    const _note = new Note('title2', 'title content');
    const _notebook = notebook.update(note);
    const __notebook = _notebook.update(_note);
    const wordSet = __notebook.dictionary.get('content');

    expect(__notebook.notes.size).to.equal(2);
    expect(__notebook.dictionary.size).to.equal(2);
    expect(wordSet).to.not.equal(undefined);
    expect(wordSet).to.not.equal(null);
    if (wordSet) expect(wordSet.size).to.equal(2);

    expect(__notebook.references(note).size).to.equal(1);
    expect(__notebook.mentions(_note).size).to.equal(1);

    expect(__notebook.references(_note).size).to.equal(0);
    expect(__notebook.mentions(note).size).to.equal(0);
  });
});

