import { useRef, useEffect, useState, Fragment } from "react";
import {
  endOfWeek,
  startOfWeek,
  addDays,
  startOfToday,
  subDays,
  format,
  isEqual,
} from "date-fns";

import { appointments } from "./appointments";

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
export default function Test2() {
  const firstTimeBlockRef = useRef<HTMLDivElement>(null);
  const [timeBlockHeight, setTimeBlockHeight] = useState(0);
  const today = startOfToday();
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [startDate, setStartDate] = useState<Date>(getDatesOfWeek(today)[0]);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const [calendarContainerWidth, setCalendarContainerWidth] = useState(0);

  useEffect(() => {
    if (!firstTimeBlockRef.current) return;
    if (!calendarContainerRef.current) return;
    setTimeBlockHeight(
      firstTimeBlockRef.current.getBoundingClientRect().height
    );
    setCalendarContainerWidth(
      calendarContainerRef.current.getBoundingClientRect().width
    );
  }, []);

  //for next/prev week button
  useEffect(() => {
    setWeekDates(getDatesOfWeek(startDate));
  }, [startDate, setWeekDates]);

  return (
    <div className="flex flex-col h-screen p-6 text-main_primary font-poppins">
      <div className="flex w-full overflow-y-scroll header-scrollbar">
        <div className="w-[10%] bg-calendar_borders grid place-items-center"></div>
        {weekDates.map((weekDate, dateIndex) => {
          return (
            <div
              key={dateIndex}
              className={`flex-1 py-4 text-center bg-calendar_bg border-calendar_borders border-b ${
                dateIndex !== weekDates.length - 1 ? "border-r" : ""
              }`}
            >
              <p className="font-bold">{format(weekDate, "EEEE")}</p>
              <p>{format(weekDate, `MMMM d, yyyy`)}</p>
            </div>
          );
        })}
      </div>
      <div
        ref={calendarContainerRef}
        className="flex-1 overflow-x-hidden overflow-y-auto"
      >
        <div className="flex">
          <div className="w-[10%] relative">
            {Array.from({ length: 24 }).map((hour, index) => {
              return (
                <Fragment key={index}>
                  {index !== 0 && (
                    <div
                      style={{
                        width: `${calendarContainerWidth}px`,
                      }}
                      className="absolute h-[1px] bg-calendar_borders"
                    ></div>
                  )}
                  <div
                    className={`py-12 text-center bg-calendar_borders`}
                    key={index}
                    ref={index === 0 ? firstTimeBlockRef : null}
                  >
                    <p>{`${index < 10 ? "0" : ""}${index}:00`}</p>
                  </div>
                </Fragment>
              );
            })}
          </div>
          <div className="flex flex-1 bg-calendar_bg">
            {weekDates.map((weekDate, dateIndex) => {
              return (
                <div
                  className={`relative flex-1 flex flex-col items-center ${
                    dateIndex !== weekDates.length - 1 ? "border-r" : ""
                  } border-calendar_borders`}
                >
                  {appointments
                    .filter((appointment) => {
                      return (
                        format(appointment.startTime, "MMM dd yyyy") ===
                        format(weekDate, "MMM dd yyyy")
                      );
                    })
                    .map((appointmentDay, appointmentDayIndex) => {
                      const minToHr = (min: number) => min / 60;
                      //function that calulcates top offset of element
                      const getTopOffset = (
                        timeHour: number,
                        timeMinute: number
                      ) => {
                        const timeTotalHrs = timeHour + minToHr(timeMinute);
                        return timeTotalHrs * timeBlockHeight;
                      };

                      //getting start time top offset
                      const startTimeHour = appointmentDay.startTime.getHours();
                      const startTimeMinute =
                        appointmentDay.startTime.getMinutes();
                      const startTimeTopOffset = getTopOffset(
                        startTimeHour,
                        startTimeMinute
                      );

                      //getting end time top offset
                      const endTimeHour = appointmentDay.endTime.getHours();
                      const endTimeMinute = appointmentDay.endTime.getMinutes();
                      const endTimeTopOffset = getTopOffset(
                        endTimeHour,
                        endTimeMinute
                      );

                      //calculating height of appointment block
                      const appointmentBlockHeight =
                        endTimeTopOffset - startTimeTopOffset;
                      return (
                        <div
                          style={{
                            transform: `translateY(${startTimeTopOffset}px)`,
                            height: `${appointmentBlockHeight}px`,
                          }}
                          key={appointmentDayIndex}
                          className="absolute w-[90%] bg-white px-2 flex flex-col items-center justify-center gap-1 rounded-3xl text-sm text-center border-2 border-green-500"
                        >
                          <p>Consulation with {appointmentDay.name}</p>
                          <p>{`${
                            startTimeHour < 10 ? "0" : ""
                          }${startTimeHour}:${startTimeMinute}${
                            startTimeMinute < 10 ? "0" : ""
                          } - ${
                            endTimeHour < 10 ? "0" : ""
                          }${endTimeHour}:${endTimeMinute}${
                            endTimeMinute < 10 ? "0" : ""
                          }`}</p>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
