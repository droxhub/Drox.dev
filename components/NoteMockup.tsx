"use client";
import React from "react";

export function NoteMockup() {
  // Get current date information
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth(); // 0-indexed
  const currentYear = now.getFullYear();

  // Format the date for display
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayOfWeek = days[now.getDay()];
  const monthName = months[currentMonth];

  // Get ordinal suffix for day (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Calculate calendar grid
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Calculate previous month days to show
  const prevMonthDays = [];
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday start

  for (let i = startDay - 1; i >= 0; i--) {
    prevMonthDays.push(daysInPrevMonth - i);
  }

  // Calculate current month days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="w-full flex justify-center items-center">
      {/* Scaling wrapper - makes component act like an image */}
      <div className="origin-top scale-[1.3] sm:scale-[0.65] md:scale-[0.65] lg:scale-[0.85] xl:scale-[1.0]">
        {/* Fixed base size - acts as the "image" dimensions */}
        <div className="w-[320px] sm:w-[900px] md:w-[1300px] h-[500px] sm:h-[720px]">
          <div className="w-full h-full backdrop-blur-xl p-2 border border-white/10 rounded-3xl backdrop-blur-sm bg-transparent">
            <div className="border border-white/10 rounded-2xl w-full h-full">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                {/* Main container */}
                <div className="relative h-full p-6 flex gap-4">
                  {/* Left Sidebar - Hidden on mobile and small, visible on tablet and desktop */}
                  <div className="w-0 md:w-56 hidden md:block backdrop-blur-md bg-transparent rounded-2xl p-4 shadow-lg border border-white/10">
                    <div className="flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/5 rounded-2xl">
                      <svg
                        className="w-3.5 h-3.5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                        />
                      </svg>
                      <input
                        className="bg-transparent text-xs text-gray-300 outline-none w-full font-light"
                        placeholder="Search anything..."
                      />
                      <span className="text-[10px] text-gray-400">⌘K</span>
                    </div>

                    {/* Menu items */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 px-3 py-1.5 bg-indigo-500/15 rounded-2xl text-indigo-300">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                          />
                        </svg>
                        <span className="text-xs font-normal">Daily notes</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-1.5 text-gray-300 hover:bg-white/5 rounded-2xl transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                          />
                        </svg>
                        <span className="text-xs font-light">All notes</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-1.5 text-gray-400 hover:bg-white/5 rounded-2xl transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                          />
                        </svg>
                        <span className="text-xs font-light">Tasks</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-1.5 text-gray-400 hover:bg-white/5 rounded-2xl transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                          />
                        </svg>
                        <span className="text-xs font-light">Map</span>
                      </div>
                    </div>

                    {/* Bottom section */}
                    <div className="absolute bottom-4 left-4 right-4 space-y-2">
                      <div className="text-[12px] text-gray-400 font-light">
                        Pinned notes
                      </div>
                      <div className="text-xs text-gray-300 font-light">
                        Getting started with Drox Dev
                      </div>
                      <div className="text-xs text-gray-400 font-light">
                        Web development best practices
                      </div>
                      <div className="text-xs text-gray-400 font-light">
                        Project planning guide
                      </div>
                      <div className="text-xs text-gray-400 font-light">
                        Client collaboration tips
                      </div>
                    </div>
                  </div>

                  {/* Main Content - Hidden on mobile, visible on small and up */}
                  <div className="hidden sm:block flex-1 backdrop-blur-md bg-transparent rounded-2xl p-3 sm:p-3 md:p-4 shadow-lg border border-white/10 overflow-hidden">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-5 bg-indigo-400 rounded-full" />
                        <div className="text-[13px] text-gray-300 font-light">
                          {dayOfWeek}, {monthName} {currentDay}
                          {getOrdinalSuffix(currentDay)}, {currentYear}
                        </div>
                      </div>
                      <h1 className="text-lg font-normal text-gray-200 mb-3">
                        Today I partnered with{" "}
                        <span className="text-indigo-300">Drox Dev!</span>
                      </h1>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 text-gray-300">
                      <div className="flex gap-2.5">
                        <span className="text-gray-500 text-[13px] mt-0.5">
                          •
                        </span>
                        <div>
                          <div className="font-normal text-[14px] mb-1 text-gray-200">
                            What is Drox Dev?
                          </div>
                          <p className="text-[13px] font-light leading-relaxed">
                            A cutting-edge web development agency that
                            transforms ideas into powerful digital experiences
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2.5">
                        <span className="text-gray-500 text-[13px] mt-0.5">
                          •
                        </span>
                        <div className="text-[13px] font-light leading-relaxed">
                          They specialize in modern web technologies and create
                          stunning, high-performance applications tailored to
                          your business needs (learn more{" "}
                          <span className="text-indigo-400 underline cursor-pointer">
                            here
                          </span>
                          )
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <span className="text-gray-500 text-[10px] mt-0.5">
                          •
                        </span>
                        <div className="text-[10px] font-light leading-relaxed">
                          From concept to deployment, Drox Dev delivers
                          exceptional results that drive growth and innovation.
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <span className="text-gray-500 text-[10px] mt-0.5">
                          •
                        </span>
                        <div>
                          <div className="font-normal text-[14px] mb-1.5 text-gray-200">
                            What services does Drox Dev offer?
                          </div>
                          <div className="space-y-1 ml-4 text-[13px]">
                            <div className="text-indigo-300 underline cursor-pointer">
                              Custom Web Applications
                            </div>
                            <div className="text-indigo-300 underline cursor-pointer">
                              E-commerce Solutions
                            </div>
                            <div className="flex gap-1 font-light">
                              <span className="text-indigo-300 underline cursor-pointer">
                                UI/UX Design
                              </span>
                              <span className="text-gray-400">and</span>
                              <span className="text-indigo-300 underline cursor-pointer">
                                Branding
                              </span>
                            </div>
                            <div className="text-indigo-300 underline cursor-pointer">
                              API Development &amp; Integration
                            </div>
                            <div className="text-indigo-300 underline cursor-pointer">
                              Performance Optimization
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2.5">
                        <span className="text-gray-500 text-[13px] mt-0.5">
                          •
                        </span>
                        <div className="text-[13px] font-light leading-relaxed">
                          Expert in{" "}
                          <span className="text-indigo-400 underline cursor-pointer">
                            React
                          </span>
                          ,{" "}
                          <span className="text-indigo-400 underline cursor-pointer">
                            Next.js
                          </span>
                          , and modern web frameworks
                        </div>
                      </div>

                      <div className="flex gap-2.5">
                        <span className="text-gray-500 text-[13px] mt-0.5">
                          •
                        </span>
                        <div className="text-[13px] font-light leading-relaxed">
                          Ready to elevate your digital presence with Drox Dev
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar - Calendar - Always visible, fixed width */}
                  <div className="w-64 backdrop-blur-md bg-transparent rounded-2xl p-4 sm:p-5 shadow-lg border border-white/10">
                    <div className="text-right mb-5">
                      <div className="text-[15px] text-gray-300 font-light">
                        {monthName} {currentYear}
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                        <div
                          key={day}
                          className="text-gray-500 text-[13px] mb-2 font-light"
                        >
                          {day}
                        </div>
                      ))}

                      {/* Previous month days */}
                      {prevMonthDays.map((day) => (
                        <div
                          key={`prev-${day}`}
                          className="text-gray-500 text-[14px] font-light aspect-square flex items-center justify-center"
                        >
                          {day}
                        </div>
                      ))}

                      {/* Current month days */}
                      {currentMonthDays.map((day) => (
                        <div
                          key={day}
                          className={
                            day === currentDay
                              ? "bg-indigo-500 text-white rounded-md font-normal text-[14px] aspect-square flex items-center justify-center"
                              : "text-gray-300 hover:bg-indigo-900 rounded-md transition cursor-pointer text-[14px] font-light aspect-square flex items-center justify-center"
                          }
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Note actions */}
                    <div className="mt-8 pt-5 border-t border-white/5">
                      <div className="text-[13px] text-gray-400 mb-4 font-light">
                        Note actions
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5 text-gray-300">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                            />
                          </svg>
                          <span className="text-[14px] font-light">
                            Pin this note
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-gray-300">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                            />
                          </svg>
                          <span className="text-[14px] font-light">
                            Share with private link
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-gray-300">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                            />
                          </svg>
                          <span className="text-[14px] font-light">
                            Show history
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
