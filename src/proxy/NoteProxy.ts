import Note from './../Note';
import { SingletonNotebook } from './SingletonNotebook';

class Note_ extends Note {
  public setContent(content: string): Note_ {
    this.content = content;
    SingletonNotebook.create(this.title, content);
    return this;
  }
}

export const NoteProxyHandler = {
  construct: (target: any, args: any) => {
    return SingletonNotebook.create(args[0], args[1]);
  }
};

export const NoteProxy = new Proxy(Note_, NoteProxyHandler);



export const Handler = {
  set(note: any, prop: string, value: any) {
    note[prop] = value;
    if (prop === 'content') note.update();
    return true;
  }
};