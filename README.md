---

## Introduction

Brainstorm.center.core is the core library used in brainstorm.center, that provides utilities to write notes and automaticly create relations between them.

#### Example:

It acomplish this by exposing the Note and the Notebook class:

```js
import Notebook from 'brainstorm.center.core/Notebook';
import Note from 'brainstorm.center.core/Note';

const note = new Note('Functional programming', 'In computer science, functional programming is a programming paradigm where programs are constructed by applying and composing functions.');
const note2 = new Note('Functions', 'In computer programming, a subroutine is a sequence of program instructions that performs a specific task, packaged as a unit.');
const notebook = new Notebook().update(note).update(note2);
// Get mentions
const mentions = notebook.getMentionsOf(note); // returns a Inmutable.Set<Mention>() { Mention { from: note, to: note2, key: 'functions' } }
const references = notebook.getReferencesOf(note2); // returns a Inmutable.Set<Mention>() { Mention { from: note2, to: note, key: 'functions' } }
```

#### Core library in TS and JS

The library is writen in TS and transpiled to JS and both files are exposed.

#### Singleton Pattern

It also provides a Notebook Singleton object and a Proxy Note object that automaticly keep track of all the changes of any instance, updating the Notebook.notes repo.

```js
import { Notebook } from 'brainstorm.center.core/singleton/Notebook';
import { NoteProxy as Note } from 'brainstorm.center.core/singleton/Note';

const note = new Note('Title', 'content');
Notebook.dictionary.size === 1; // true
Notebook.notes.size === 1; // true
// do it twice and it must keep the same values because the note has the same title.
// this next line will not return a new note because there is already a Note with the same title, it will return the curent note from Notebook.notes and the note.content updated.
const noteCopy = new Note('Title', 'content'); 
Notebook.dictionary.size === 1; // true
Notebook.notes.size === 1; // true
note === noteCopy; // true
```