import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { useState } from "react";
import Test from "./Test";

type appointment = {
  date: string
  time: string
  customerType: 'R' | 'S' | 'P'
}

function App() {
  return <Test/>
  // const today = startOfToday();
  // const [selectedDay, setSelectedDay] = useState(today);
  // const [currentMonth, setCurrentMonth] = useState<string>(
  //   format(today, "MMM yyyy")
  // );

  // const firstDayOfCurrentMonth: Date = parse(
  //   currentMonth,
  //   "MMM yyyy",
  //   new Date()
  // );

  // const days = eachDayOfInterval({
  //   start: firstDayOfCurrentMonth,
  //   end: endOfMonth(firstDayOfCurrentMonth),
  // });


  // return (
  //   <div className="grid h-screen place-items-center">
  //     <div className="p-6">
  //       <div className="flex items-center justify-between">
  //         <p>{format(firstDayOfCurrentMonth, "MMM yyyy")}</p>
  //         <div className="flex gap-3">
  //           <p>Prev</p>
  //           <p>Next</p>
  //         </div>
  //       </div>
  //       <div className="grid grid-cols-7 mt-4 text-center text-gray-500">
  //         <div>MON</div>
  //         <div>TUE</div>
  //         <div>WED</div>
  //         <div>THU</div>
  //         <div>FRI</div>
  //         <div>SAT</div>
  //         <div>SUN</div>
  //       </div>
  //       <div className="grid grid-cols-7 p-6 gap-x-2 gap-y-1 bg-calendar_bg">
  //         {days.map((day, index) => {
  //           console.log(day);
  //           return (
  //               <button type="button"
  //                 className={classNames(
  //                     'flex flex-col items-center justify-center',
  //                     index === 0 && colStartClasses[getDay(day)],
  //                     'aspect-[4/3] w-24 bg-white rounded-sm'
  //                 )}
  //               >
  //                 <time dateTime={format(day, 'yyyy-MM-dd')}>
  //                     {format(day, 'd')}
  //                   </time>

  //               </button>

  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
