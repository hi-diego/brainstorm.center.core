declare class NotebookItem {
    uuid: string;
    createdAt: Date;
    modifiedAt: Date;
    constructor(_uuid?: string, createdAt?: Date, modified_at?: Date);
}
export default NotebookItem;
