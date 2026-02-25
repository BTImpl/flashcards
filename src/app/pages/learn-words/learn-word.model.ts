import { WordCardModel } from "src/app/components/word-card/word-card.model";

export interface LearnWordModel {
  hu: WordCardModel,
  en: WordCardModel
}

export interface LearnWordData {
  hu: string;
  en: string;
}

export type LangKey = 'hu' | 'en';
