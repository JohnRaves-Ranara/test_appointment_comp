
import { useRef, useEffect, useState } from "react";

type appointment = {
  name: string;
  startTime: Date;
  endTime: Date;
  dayIndex?: number;
};

const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const appointmentsStatic: appointment[] = [
  {
    name: "Rendell",
    startTime: new Date(2024, 4, 28, 21, 30),
    endTime: new Date(2024, 4, 28, 22, 35),
  },
  {
    name: "Gab",
    startTime: new Date(2024, 4, 27, 15, 0),
    endTime: new Date(2024, 4, 27, 17, 45),
  },
  {
    name: "Gerome",
    startTime: new Date(2024, 5, 2, 7, 22),
    endTime: new Date(2024, 5, 2, 10, 45),
  },
];

// function getOffsetY(
//   containerRef: HTMLDivElement | null,
//   elementRef: HTMLDivElement | null
// ) {
//   const containerRect = containerRef?.getBoundingClientRect();
//   const elementRect = elementRef?.getBoundingClientRect();

//   if (containerRect && elementRect) {
//     return elementRect.top - containerRect.top + (containerRef?.scrollTop ?? 0);
//   }
// }

// function getCardPositions(appointment: appointment, times: time[]) {
//   const foundStartTime = times.find((time) => {
//     return appointment.startTime === time.time;
//   });

//   const foundEndTime = times.find((time) => {
//     return appointment.endTime === time.time;
//   });

//   const translateY = foundStartTime?.offsetY;
//   const itemHeight =
//     translateY && foundEndTime?.offsetY
//       ? foundEndTime.offsetY - translateY
//       : undefined;

//   return { translateY, itemHeight };
// }

export default function Test2() {
  const firstTimeBlockRef = useRef<HTMLDivElement>(null);
  const [timeBlockHeight, setTimeBlockHeight] = useState(0);
  const [appointments, setAppointments] = useState<appointment[]>([]);

  useEffect(() => {
    if (!firstTimeBlockRef.current) return;

    const timeBlockHeight =
      firstTimeBlockRef.current.getBoundingClientRect().height;
    setTimeBlockHeight(timeBlockHeight);

    setAppointments(
      appointmentsStatic.map((appointment) => {
        return {
          ...appointment,
          dayIndex:
            appointment.startTime.getDay() - 1 === -1
              ? 6
              : appointment.startTime.getDay() - 1,
        };
      })
    );
  }, []);

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="flex w-full overflow-y-scroll header-scrollbar">
        <div className="w-[10%] bg-green-200 grid place-items-center">Time</div>
        {daysOfTheWeek.map((dayOfTheWeek, index) => {
          return (
            <div key={index} className="flex-1 py-4 text-center bg-green-200">
              {dayOfTheWeek}
            </div>
          );
        })}
      </div>
      <div className="flex-1 overflow-auto">
        <div className="flex">
          <div className="w-[10%]">
            {Array.from({ length: 24 }).map((hour, index) => {
              return (
                <div
                  className={`py-6 text-center text-white bg-gray-400 border-black ${
                    index !== 23 ? "border-b" : ""
                  }`}
                  key={index}
                  ref={index === 0 ? firstTimeBlockRef : null}
                >
                  <p>{`${index < 10 ? "0" : ""}${index}:00`}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-1 bg-blue-200">
            {daysOfTheWeek.map((dayOfTheWeek, dayIndex) => {
              return (
                <div
                  className={`relative flex-1 flex flex-col items-center ${
                    dayIndex !== daysOfTheWeek.length - 1 ? "border-r" : ""
                  } border-gray-500`}
                >
                  {appointments
                    .filter((appointment) => appointment.dayIndex === dayIndex)
                    .map((appointmentDay, appointmentDayIndex) => {
                      const minToHr = (min: number) => min / 60;
                      const startTimeHour = appointmentDay.startTime.getHours();
                      const startTimeMinute =
                        appointmentDay.startTime.getMinutes();
                      const startTimeTotalHrs =
                        startTimeHour + minToHr(startTimeMinute);

                      const translateY = startTimeTotalHrs * timeBlockHeight;

                      const endTimeHour = appointmentDay.endTime.getHours();
                      const endTimeMinutes =
                        appointmentDay.endTime.getMinutes();
                      const endTimeTotalHrs =
                        endTimeHour + minToHr(endTimeMinutes);

                      const appointmentBlockHeight =
                        (endTimeTotalHrs - startTimeTotalHrs) * timeBlockHeight;
                      return (
                        <div
                          style={{
                            transform: `translateY(${translateY}px)`,
                            height: `${appointmentBlockHeight}px`,
                          }}
                          key={appointmentDayIndex}
                          className="absolute w-[90%] bg-blue-500 px-2 flex flex-col items-center justify-center gap-1 text-white rounded-lg text-sm text-center"
                        >
                          <p>Consulation with {appointmentDay.name}</p>
                          <p>{`${
                            startTimeHour < 10 ? "0" : ""
                          }${startTimeHour}:${startTimeMinute}${
                            startTimeMinute < 10 ? "0" : ""
                          } - ${
                            endTimeHour < 10 ? "0" : ""
                          }${endTimeHour}:${endTimeMinutes}${
                            endTimeMinutes < 10 ? "0" : ""
                          }`}</p>
                          <p>{`${daysOfTheWeek[appointmentDay.dayIndex!]}`}</p>
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
  // const timeRefs = useRef<(HTMLDivElement | null)[]>([]);
  // const containerRef = useRef<HTMLDivElement | null>(null);

  // const [times, setTimes] = useState<time[]>(timesArray);

  // useEffect(() => {
  //   setTimes(
  //     times.map((time, index) => {
  //       return {
  //         ...time,
  //         offsetY: getOffsetY(containerRef.current, timeRefs.current[index]),
  //       };
  //     })
  //   );
  // }, []);

  // return (
  //   <div className="flex flex-col h-screen p-6">
  //     <div className="flex w-full overflow-y-scroll header-scrollbar">
  //       <div className="w-[10%] bg-green-200 grid place-items-center">Time</div>
  //       {daysOfTheWeek.map((dayOfTheWeek, index) => {
  //         return (
  //           <div key={index} className="flex-1 py-4 text-center bg-green-200">
  //             {dayOfTheWeek.day}
  //           </div>
  //         );
  //       })}
  //     </div>
  //     <div className="flex-1 overflow-auto">
  //       <div className="flex">
  //         <div ref={containerRef} className="w-[10%]">
  //           {hours.map((hour, index) => {
  //             return (
  //               <div
  //                 key={index}
  //                 className="relative flex flex-col justify-start"
  //               >
  //                 <p className={`z-10 py-6 text-lg text-center text-gray-200 border border-black`}>
  //                   {hour.hour}:00
  //                 </p>
  //                 <div className="absolute flex flex-col size-full">
  //                   {times.map((time, index) => {
  //                     if (time.time.split(":")[0] === hour.hour) {
  //                       return (
  //                         <div
  //                           id={time.time}
  //                           key={index}
  //                           ref={(el) => {
  //                             timeRefs.current[index] = el;
  //                           }}
  //                           className="flex-1 bg-gray-500"
  //                         ></div>
  //                       );
  //                     }
  //                   })}
  //                 </div>
  //               </div>
  //             );
  //           })}
  //         </div>
  //         <div className="flex flex-1 bg-blue-200">
  //           {daysOfTheWeek.map((dayOfTheWeek, index) => {
  //             return (
  //               <div
  //                 key={index}
  //                 className={`relative flex flex-col items-center flex-1 border-gray-500 ${
  //                   index !== daysOfTheWeek.length - 1 ? "border-r" : ""
  //                 }`}
  //               >
  //                 {appointments.map((appointment, index) => {
  //                   const { translateY, itemHeight } = getCardPositions(
  //                     appointment,
  //                     times
  //                   );
  //                   if (appointment.day === dayOfTheWeek.day) {
  //                     return (
  //                       <div
  //                         key={index}
  //                         style={{
  //                           transform: `translateY(${translateY}px)`,
  //                           height: `${itemHeight}px`,
  //                         }}
  //                         className="text-center px-3 gap-3 absolute flex flex-col items-center justify-center w-[90%] font-semibold text-white bg-purple-500 rounded-xl"
  //                       >
  //                         <p>Consultation for {appointment.name}</p>
  //                         <p>{`${appointment.startTime} - ${appointment.endTime}`}</p>
  //                       </div>
  //                     );
  //                   }
  //                 })}
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
