export const categories = [
  {
    _id: "64734985e6106c7e56ca9983",
    name: "Cat_1",
    __v: 0,
  },
  {
    _id: "64734fb3ecf85f7bb37ccf81",
    name: "Cat_2",
    __v: 0,
  },
  {
    _id: "647357f00625410a6c931ff4",
    name: "Cat_3",
    __v: 0,
  },
  {
    _id: "647357f30625410a6c931ff6",
    name: "Cat_4",
    __v: 0,
  },
  {
    _id: "647357f50625410a6c931ff8",
    name: "Cat_5",
    __v: 0,
  },
] as const;

export const categoryIDs = categories.map((c) => c._id);
