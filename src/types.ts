export interface MedicalTermData {
  id: number;
  englishTerm: string;
  haitianCreole: string[];
  category: string;
  sourcePdfPages: number[];
  sourceHeadword?: string;
  sourceNote?: string;
}

// this class creates one medical term object.
export class MedicalTerm {
  id: number;
  englishTerm: string;
  haitianCreole: string[];
  category: string;
  sourcePdfPages: number[];
  sourceHeadword?: string;
  sourceNote?: string;

  constructor(data: MedicalTermData) {
    this.id = data.id;
    this.englishTerm = data.englishTerm;
    this.haitianCreole = data.haitianCreole;
    this.category = data.category;
    this.sourcePdfPages = data.sourcePdfPages;
    this.sourceHeadword = data.sourceHeadword;
    this.sourceNote = data.sourceNote;
  }
}
