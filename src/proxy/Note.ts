// import Immutable from 'immutable';
// import Note from '../Note';
// // import NotebookItem from './NotebookItem';


// // type _Note {
// //   setTitle: () =>
// // }

// /**
//  * Note class is the holder of Mentions.
//  * @class
//  */
// function _Note(_title: string, _content: string) {
//   const title = _title;
//   const content = _content;
//   this.setTitle = function () {

//   }
// }

// /**
//  * Note class is the holder of Mentions.
//  * @class
//  */
// class StickyNote extends Note {

//   public title: string;
//   public content: string = '';

//   constructor (title: string, content: string, uuid?: string, createdAt?: Date, modifiedAt?: Date) {
//     super(uuid, createdAt, modifiedAt);
//     this.title = title;
//     this.content = content;
//   }

//   /**
//    * Return all the words in the content.
//    */
//   public words (prev: boolean = false) : Immutable.Set<string> {
//     const words = this.content.toLowerCase().replace(/((\W)(\s|$))/g, '').split(/\s+/g) || [];
//     return Immutable.Set<string>(words);
//   }

//   /**
//    * Return all the words in the content.
//    */
//   public clone (from?: Note) : Note {
//     return new Note(this.title, this.content, (from && from.uuid) || this.uuid, this.createdAt, this.modifiedAt);
//   }
// }

// export default StickyNote;