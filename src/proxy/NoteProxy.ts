import Note from './../Note';
import { SingletonNotebook } from './SingletonNotebook';

export const NoteProxyHandler = {
  construct: (target: any, args: any) => {
    const note = new target(...args);
    SingletonNotebook.update(note);
    return note;
  }
};

export const NoteProxy = new Proxy(Note, NoteProxyHandler);
