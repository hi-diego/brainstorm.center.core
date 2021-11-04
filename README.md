---

## Introduction

Brainstorm.center.core is the core library used in brainstorm.center, that provides utilities to write notes and automaticly create relations between them.

#### Example:

It acomplish this by exposing the Note and the Notebook class:

```js
const note = new Note('Functional programming', 'In computer science, functional programming is a programming paradigm where programs are constructed by applying and composing functions.');
const note2 = new Note('Functions', 'In computer programming, a subroutine is a sequence of program instructions that performs a specific task, packaged as a unit.');
const notebook = new Notebook().update(note).update(note2);
// Get mentions
const mentions = notebook.getMentionsOf(note); // returns a Inmutable.Set<Mention>() { Mention { from: note, to: note2, key: 'functions' } }
const references = notebook.getReferencesOf(note2); // returns a Inmutable.Set<Mention>() { Mention { from: note2, to: note, key: 'functions' } }
```

#### Core library in TS and JS

The library is writen in TS and transpiled to JS and both files are exposed.

#### Singleton Pattern Work in progress

The library is heavily influenced by Functional programing paradignm but a Singleton more OOP pattern is cooking.