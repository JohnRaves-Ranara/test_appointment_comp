import { useRef, useEffect, useState } from "react";
import { timesArray, time } from "./time-array";
import { hours } from "./hours-array";
import { daysOfTheWeek } from "./days-array";

type appointment = {
  name: string;
  startTime: string;
  endTime: string;
  day: string;
};

const appointments: appointment[] = [
  {
    name: "Rendell",
    startTime: "08:35",
    endTime: "11:20",
    day: "Thursday",
  },
  {
    name: "Gab",
    startTime: "15:00",
    endTime: "17:00",
    day: "Tuesday",
  },
  {
    name: "Raves",
    startTime: "18:15",
    endTime: "21:05",
    day: "Saturday",
  },
  {
    name: "Riki",
    startTime: "11:55",
    endTime: "13:15",
    day: "Saturday"
  },
  {
    name: "Sir Bon",
    startTime: "09:20",
    endTime: "10:35",
    day: "Monday"
  }
];

function getOffsetY(
  containerRef: HTMLDivElement | null,
  elementRef: HTMLDivElement | null
) {
  const containerRect = containerRef?.getBoundingClientRect();
  const elementRect = elementRef?.getBoundingClientRect();

  if (containerRect && elementRect) {
    return elementRect.top - containerRect.top + (containerRef?.scrollTop ?? 0);
  }
}

function getCardPositions(appointment: appointment, times: time[]) {
  const foundStartTime = times.find((time) => {
    return appointment.startTime === time.time;
  });

  const foundEndTime = times.find((time) => {
    return appointment.endTime === time.time;
  });

  const translateY = foundStartTime?.offsetY;
  const itemHeight =
    translateY && foundEndTime?.offsetY
      ? foundEndTime.offsetY - translateY
      : undefined;

  return { translateY, itemHeight };
}

export default function Test() {
  const timeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [times, setTimes] = useState<time[]>(timesArray);

  useEffect(() => {
    setTimes(
      times.map((time, index) => {
        return {
          ...time,
          offsetY: getOffsetY(containerRef.current, timeRefs.current[index]),
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
              {dayOfTheWeek.day}
            </div>
          );
        })}
      </div>
      <div className="flex-1 overflow-auto">
        <div className="flex">
          <div ref={containerRef} className="w-[10%]">
            {hours.map((hour, index) => {
              return (
                <div
                  key={index}
                  className="relative flex flex-col justify-start"
                >
                  <p className={`z-10 py-6 text-lg text-center text-gray-200 border border-black`}>
                    {hour.hour}:00
                  </p>
                  <div className="absolute flex flex-col size-full">
                    {times.map((time, index) => {
                      if (time.time.split(":")[0] === hour.hour) {
                        return (
                          <div
                            id={time.time}
                            key={index}
                            ref={(el) => {
                              timeRefs.current[index] = el;
                            }}
                            className="flex-1 bg-gray-500"
                          ></div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-1 bg-blue-200">
            {daysOfTheWeek.map((dayOfTheWeek, index) => {
              return (
                <div
                  key={index}
                  className={`relative flex flex-col items-center flex-1 border-gray-500 ${
                    index !== daysOfTheWeek.length - 1 ? "border-r" : ""
                  }`}
                >
                  {appointments.map((appointment, index) => {
                    const { translateY, itemHeight } = getCardPositions(
                      appointment,
                      times
                    );
                    if (appointment.day === dayOfTheWeek.day) {
                      return (
                        <div
                          key={index}
                          style={{
                            transform: `translateY(${translateY}px)`,
                            height: `${itemHeight}px`,
                          }}
                          className="text-center px-3 gap-3 absolute flex flex-col items-center justify-center w-[90%] font-semibold text-white bg-purple-500 rounded-xl"
                        >
                          <p>Consultation for {appointment.name}</p>
                          <p>{`${appointment.startTime} - ${appointment.endTime}`}</p>
                        </div>
                      );
                    }
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
