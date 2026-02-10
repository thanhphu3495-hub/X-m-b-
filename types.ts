export interface Lot {
  id: number;
  title: string;
  luckLevel: string; // e.g., "Thượng Thượng", "Trung Bình", "Hạ Hạ"
  chinesePoem: string[];
  hanVietPoem: string[];
  translationPoem: string[];
  interpretation: string[]; // "Giải" section
  commentary: string; // "Lời bàn"
}

export interface LotData {
  [key: number]: Lot;
}