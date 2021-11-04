---

## Introduction

Brainstorm.center.core is the core library used in brainstorm.center, that provides utilities to write notes and automaticly create relations between them.

#### Functional Example

It acomplish this by exposing the Note and the Notebook class:

```js
const note = new Note('Functional programming', 'In computer science, functional programming is a programming paradigm where programs are constructed by applying and composing Functions');
    const note2 = new Note('Functions', 'In computer programming, a subroutine is a sequence of program instructions that performs a specific task, packaged as a unit');
    const notebook = new Notebook().update(note).update(note2);
    // Get mentions
    const mentions = notebook.mentions(note); // returns a Inmutable.Set<Mention>() { Mention { from: note, to: note2, key: 'functions' } }
    const references = notebook.references(note2); // returns a Inmutable.Set<Mention>() { Mention { from: note2, to: note, key: 'functions' } }
```

#### Core library in TS and JS

It acomplish this by exposing 3 Classses

#### Work in progress

It acomplish this by exposing 3 Classses