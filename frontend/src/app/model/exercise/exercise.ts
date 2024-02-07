import {Picture} from "../picture/picture";

export class Exercise {
  id?: number;
  name : string;
  type : string;
  category: string;
  pictures?: Picture[];
}
