type appointment = {
  name: string;
  startTime: Date;
  endTime: Date;
  dayIndex?: number;
};

export const appointments: appointment[] = [
  {
    name: "Sir Bon",
    startTime: new Date(2024, 4, 28, 1, 30),
    endTime: new Date(2024, 4, 28, 3, 22),
  },
  {
    name: "Gab",
    startTime: new Date(2024, 4, 27, 15, 0),
    endTime: new Date(2024, 4, 27, 17, 45),
  },
  {
    name: "Rendell",
    startTime: new Date(2024, 5, 2, 0, 15),
    endTime: new Date(2024, 5, 2, 3, 13),
  },
];
