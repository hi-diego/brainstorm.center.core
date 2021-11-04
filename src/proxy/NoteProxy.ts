import Note from './../Note';
import SingletonNotebook from './SingletonNotebook';

export const NoteProxyHandler = {
  construct: (target: any, args: any) => {
    return SingletonNotebook.get(target.title) || new target(...args);
  }
};

export const NoteProxy = new Proxy(Note, NoteProxyHandler);
