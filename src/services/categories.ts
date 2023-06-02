export interface NoteCategory {
  _id: string;
  name: string;
}

const categories: NoteCategory[] = [
  {
    _id: "64734985e6106c7e56ca9983",
    name: "Cat_1",
  },
  {
    _id: "64734fb3ecf85f7bb37ccf81",
    name: "Cat_2",
  },
  {
    _id: "647357f00625410a6c931ff4",
    name: "Cat_3",
  },
  {
    _id: "647357f30625410a6c931ff6",
    name: "Cat_4",
  },
  {
    _id: "647357f50625410a6c931ff8",
    name: "Cat_5",
  },
];

export function getCategories() {
  return categories;
}

export const categoryIDs = categories.map((c) => c._id);
