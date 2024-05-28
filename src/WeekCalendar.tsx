import {
  endOfWeek,
  startOfWeek,
  addDays,
  startOfToday,
  subDays,
} from "date-fns";
import { useEffect, useState } from "react";

function getDatesOfWeek(date: Date): Date[] {
  // Get the start and end of the week (Monday to Sunday)
  const start = startOfWeek(date, { weekStartsOn: 1 }); // weekStartsOn: 1 means Monday
  const end = endOfWeek(date, { weekStartsOn: 1 });

  // Initialize an array to hold the dates
  const datesOfWeek: Date[] = [];

  // Loop from start of the week to end of the week
  for (let day = start; day <= end; day = addDays(day, 1)) {
    datesOfWeek.push(day);
  }

  return datesOfWeek;
}

export default function WeekCalendar() {
  const today = startOfToday();
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [startDate, setStartDate] = useState<Date>(getDatesOfWeek(today)[0]);

  useEffect(() => {
    setWeekDates(getDatesOfWeek(startDate));
  }, [startDate, setWeekDates]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <div className="flex gap-12">
        <button
          onClick={() => setStartDate(subDays(startDate, 6))}
          className="px-8 py-6 text-center text-white bg-blue-300"
        >
          PREV
        </button>
        <button
          onClick={() => setStartDate(addDays(startDate, 6))}
          className="px-8 py-6 text-center text-white bg-green-300"
        >
          NEXT
        </button>
      </div>
      <div className="flex">
        {weekDates.map((weekDate, index) => {
          return (
            <div
              key={index}
              className="text-white bg-red-500 size-24"
            >{`${weekDate}`}</div>
          );
        })}
      </div>
    </div>
  );
}
