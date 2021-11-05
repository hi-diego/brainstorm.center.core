import { default as Notebook_ } from './../Notebook';
import INote from './../INote';
declare class SingletonNotebook extends Notebook_ {
    update(note: INote, oldWords?: Immutable.Set<string>): Notebook_;
}
export declare const Notebook: SingletonNotebook;
export {};
