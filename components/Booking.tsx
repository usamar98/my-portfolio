"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

// ===== TYPES =====
type BookingStep = "calendar" | "time" | "form" | "confirmation";

interface TimeSlot {
    time: string;
    label: string;
    available: boolean;
}

// ===== HELPERS =====
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

function generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;
    for (let h = startHour; h < endHour; h++) {
        for (const m of [0, 30]) {
            const hour12 = h > 12 ? h - 12 : h;
            const ampm = h >= 12 ? "PM" : "AM";
            const timeStr = `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
            slots.push({
                time: `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
                label: timeStr,
                available: Math.random() > 0.25, // simulate availability
            });
        }
    }
    return slots;
}

// ===== SUB-COMPONENTS =====

function StepIndicator({ currentStep }: { currentStep: BookingStep }) {
    const steps: { key: BookingStep; label: string; number: string }[] = [
        { key: "calendar", label: "Date", number: "01" },
        { key: "time", label: "Time", number: "02" },
        { key: "form", label: "Details", number: "03" },
        { key: "confirmation", label: "Confirmed", number: "04" },
    ];
    const currentIndex = steps.findIndex((s) => s.key === currentStep);

    return (
        <div className="flex items-center justify-center gap-0 mb-12">
            {steps.map((step, i) => (
                <React.Fragment key={step.key}>
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 border flex items-center justify-center text-[10px] font-[family-name:var(--font-jetbrains)] transition-all duration-500 ${i <= currentIndex
                                ? "border-white bg-white text-black"
                                : "border-white/15 text-white/20"
                                }`}
                        >
                            {step.number}
                        </div>
                        <span
                            className={`font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.15em] hidden md:inline transition-colors duration-500 ${i <= currentIndex ? "text-white/70" : "text-white/15"
                                }`}
                        >
                            {step.label}
                        </span>
                    </div>
                    {i < steps.length - 1 && (
                        <div
                            className={`w-8 md:w-16 h-[1px] mx-2 transition-colors duration-500 ${i < currentIndex ? "bg-white/40" : "bg-white/10"
                                }`}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

function CalendarPicker({
    selectedDate,
    onSelectDate,
    currentMonth,
    currentYear,
    onPrevMonth,
    onNextMonth,
}: {
    selectedDate: Date | null;
    onSelectDate: (d: Date) => void;
    currentMonth: number;
    currentYear: number;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md mx-auto"
        >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onPrevMonth}
                    className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 transition-all duration-300 hoverable"
                >
                    ←
                </button>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-white font-bold">
                    {MONTHS[currentMonth]} {currentYear}
                </h3>
                <button
                    onClick={onNextMonth}
                    className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 transition-all duration-300 hoverable"
                >
                    →
                </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                    <div
                        key={day}
                        className="text-center font-[family-name:var(--font-jetbrains)] text-[9px] text-white/25 uppercase tracking-widest py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => {
                    if (day === null) {
                        return <div key={`empty-${i}`} className="aspect-square" />;
                    }

                    const date = new Date(currentYear, currentMonth, day);
                    const isPast = date < today;
                    const isToday = date.getTime() === today.getTime();
                    const isSelected =
                        selectedDate &&
                        selectedDate.getDate() === day &&
                        selectedDate.getMonth() === currentMonth &&
                        selectedDate.getFullYear() === currentYear;
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                    return (
                        <motion.button
                            key={day}
                            onClick={() => !isPast && !isWeekend && onSelectDate(date)}
                            disabled={isPast || isWeekend}
                            className={`aspect-square flex items-center justify-center font-[family-name:var(--font-jetbrains)] text-sm relative transition-all duration-300 hoverable ${isPast || isWeekend
                                ? "text-white/10 cursor-not-allowed"
                                : isSelected
                                    ? "bg-white text-black font-bold"
                                    : isToday
                                        ? "border border-white/50 text-white"
                                        : "text-white/50 hover:bg-white/10 hover:text-white"
                                }`}
                            whileHover={!isPast && !isWeekend ? { scale: 1.1 } : {}}
                            whileTap={!isPast && !isWeekend ? { scale: 0.95 } : {}}
                        >
                            {day}
                            {isToday && !isSelected && (
                                <span className="absolute bottom-1 w-1 h-1 bg-white/50 rounded-full" />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white/50 rounded-full" />
                    <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/25 uppercase tracking-wider">Today</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/25 uppercase tracking-wider">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white/10 rounded-full" />
                    <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/25 uppercase tracking-wider">Unavailable</span>
                </div>
            </div>
        </motion.div>
    );
}

function TimeSlotPicker({
    slots,
    selectedTime,
    onSelectTime,
    selectedDate,
}: {
    slots: TimeSlot[];
    selectedTime: string | null;
    onSelectTime: (t: string) => void;
    selectedDate: Date;
}) {
    const morningSlots = slots.filter((s) => parseInt(s.time) < 12);
    const afternoonSlots = slots.filter((s) => parseInt(s.time) >= 12);

    const renderSlotGroup = (label: string, groupSlots: TimeSlot[]) => (
        <div className="mb-8">
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/25 uppercase tracking-[0.2em] mb-4">
                {label}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {groupSlots.map((slot) => (
                    <motion.button
                        key={slot.time}
                        onClick={() => slot.available && onSelectTime(slot.time)}
                        disabled={!slot.available}
                        className={`py-3 px-4 border font-[family-name:var(--font-jetbrains)] text-xs tracking-wider transition-all duration-300 hoverable ${!slot.available
                            ? "border-white/5 text-white/10 cursor-not-allowed line-through"
                            : selectedTime === slot.time
                                ? "border-white bg-white text-black font-bold"
                                : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                            }`}
                        whileHover={slot.available ? { scale: 1.02 } : {}}
                        whileTap={slot.available ? { scale: 0.98 } : {}}
                    >
                        {slot.label}
                    </motion.button>
                ))}
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-auto"
        >
            {/* Selected date display */}
            <div className="text-center mb-8">
                <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/25 uppercase tracking-[0.3em] mb-2">
                    Selected Date
                </p>
                <p className="font-[family-name:var(--font-playfair)] text-xl text-white font-bold">
                    {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
            </div>

            {renderSlotGroup("Morning", morningSlots)}
            {renderSlotGroup("Afternoon", afternoonSlots)}
        </motion.div>
    );
}

function BookingForm({
    selectedDate,
    selectedTime,
    onSubmit,
}: {
    selectedDate: Date;
    selectedTime: string;
    onSubmit: (data: { name: string; email: string; message: string }) => void;
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const timeLabel = useMemo(() => {
        const h = parseInt(selectedTime.split(":")[0]);
        const m = selectedTime.split(":")[1];
        const hour12 = h > 12 ? h - 12 : h;
        const ampm = h >= 12 ? "PM" : "AM";
        return `${hour12}:${m} ${ampm}`;
    }, [selectedTime]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && email.trim()) {
            onSubmit({ name, email, message });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-auto"
        >
            {/* Appointment summary */}
            <div className="border border-white/10 p-6 mb-8">
                <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/25 uppercase tracking-[0.3em] mb-4">
                    Appointment Summary
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/20 uppercase tracking-wider mb-1">
                            Date
                        </p>
                        <p className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70">
                            {selectedDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <div>
                        <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/20 uppercase tracking-wider mb-1">
                            Time
                        </p>
                        <p className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70">
                            {timeLabel}
                        </p>
                    </div>
                    <div>
                        <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/20 uppercase tracking-wider mb-1">
                            Duration
                        </p>
                        <p className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70">
                            30 minutes
                        </p>
                    </div>
                    <div>
                        <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/20 uppercase tracking-wider mb-1">
                            Type
                        </p>
                        <p className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70">
                            Discovery Call
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/30 uppercase tracking-[0.2em] block mb-2">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your name"
                        className="w-full bg-transparent border border-white/15 px-4 py-3 font-[family-name:var(--font-jetbrains)] text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-white/50 transition-colors duration-300"
                    />
                </div>
                <div>
                    <label className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/30 uppercase tracking-[0.2em] block mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@email.com"
                        className="w-full bg-transparent border border-white/15 px-4 py-3 font-[family-name:var(--font-jetbrains)] text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-white/50 transition-colors duration-300"
                    />
                </div>
                <div>
                    <label className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/30 uppercase tracking-[0.2em] block mb-2">
                        Message (Optional)
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about your project..."
                        rows={4}
                        className="w-full bg-transparent border border-white/15 px-4 py-3 font-[family-name:var(--font-jetbrains)] text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-white/50 transition-colors duration-300 resize-none"
                    />
                </div>

                <motion.button
                    type="submit"
                    className="w-full py-4 bg-white text-black font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.3em] font-bold hover:bg-white/90 transition-colors duration-300 hoverable"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    Confirm Booking
                </motion.button>
            </form>
        </motion.div>
    );
}

function Confirmation({
    name,
    selectedDate,
    selectedTime,
    onReset,
}: {
    name: string;
    selectedDate: Date;
    selectedTime: string;
    onReset: () => void;
}) {
    const timeLabel = useMemo(() => {
        const h = parseInt(selectedTime.split(":")[0]);
        const m = selectedTime.split(":")[1];
        const hour12 = h > 12 ? h - 12 : h;
        const ampm = h >= 12 ? "PM" : "AM";
        return `${hour12}:${m} ${ampm}`;
    }, [selectedTime]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md mx-auto text-center"
        >
            {/* Success Animation */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 border-2 border-white mx-auto mb-8 flex items-center justify-center"
            >
                <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                >
                    <motion.path
                        d="M20 6L9 17L4 12"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    />
                </motion.svg>
            </motion.div>

            <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mb-3"
            >
                Booking Confirmed
            </motion.h3>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-[family-name:var(--font-jetbrains)] text-sm text-white/40 mb-10"
            >
                Thank you, {name}! You&apos;ll receive a confirmation email shortly.
            </motion.p>

            {/* Appointment Details Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="border border-white/10 p-8 mb-8 text-left"
            >
                <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/25 uppercase tracking-[0.3em] mb-6">
                    Appointment Details
                </p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/20 uppercase tracking-wider w-16">
                            Date
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70">
                            {selectedDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                    <div className="h-[1px] bg-white/5" />
                    <div className="flex items-center gap-4">
                        <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/20 uppercase tracking-wider w-16">
                            Time
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70">
                            {timeLabel}
                        </span>
                    </div>
                    <div className="h-[1px] bg-white/5" />
                    <div className="flex items-center gap-4">
                        <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/20 uppercase tracking-wider w-16">
                            Duration
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70">
                            30 minutes
                        </span>
                    </div>
                    <div className="h-[1px] bg-white/5" />
                    <div className="flex items-center gap-4">
                        <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/20 uppercase tracking-wider w-16">
                            Type
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70">
                            Free Discovery Call
                        </span>
                    </div>
                </div>
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={onReset}
                className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/20 uppercase tracking-[0.2em] hover:text-white/50 transition-colors duration-300 hoverable"
            >
                ← Book Another Slot
            </motion.button>
        </motion.div>
    );
}

// ===== MAIN COMPONENT =====
export default function Booking() {
    const [step, setStep] = useState<BookingStep>("calendar");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [userName, setUserName] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const timeSlots = useMemo(() => generateTimeSlots(), []);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setStep("time");
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setStep("form");
    };

    const handleFormSubmit = (data: { name: string; email: string; message: string }) => {
        setUserName(data.name);
        setStep("confirmation");
    };

    const handleReset = () => {
        setStep("calendar");
        setSelectedDate(null);
        setSelectedTime(null);
        setUserName("");
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((y) => y - 1);
        } else {
            setCurrentMonth((m) => m - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((y) => y + 1);
        } else {
            setCurrentMonth((m) => m + 1);
        }
    };

    const handleBack = () => {
        if (step === "time") setStep("calendar");
        if (step === "form") setStep("time");
    };

    return (
        <section id="contact" className="py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* CTA Heading */}
                <RevealOnScroll>
                    <h2 className="font-[family-name:var(--font-playfair)] text-[8vw] md:text-[6vw] font-bold text-white leading-[0.95] mb-4">
                        LET&apos;S BUILD
                        <br />
                        SOMETHING
                    </h2>
                    <p className="font-[family-name:var(--font-jetbrains)] text-sm text-white/40 tracking-wider mb-2">
                        Book a free 30-minute discovery call
                    </p>
                    <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/20 tracking-wider">
                        Select a date and time that works for you
                    </p>
                </RevealOnScroll>

                {/* Calendar Booking Widget */}
                <RevealOnScroll delay={0.2}>
                    <div className="mt-16 border border-white/10 p-8 md:p-12 min-h-[500px]">
                        {/* Step Indicator */}
                        <StepIndicator currentStep={step} />

                        {/* Back Button */}
                        {(step === "time" || step === "form") && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={handleBack}
                                className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/20 uppercase tracking-[0.2em] hover:text-white/50 transition-colors duration-300 mb-8 hoverable"
                            >
                                ← Back
                            </motion.button>
                        )}

                        {/* Step Content */}
                        <AnimatePresence mode="wait">
                            {step === "calendar" && (
                                <CalendarPicker
                                    key="calendar"
                                    selectedDate={selectedDate}
                                    onSelectDate={handleDateSelect}
                                    currentMonth={currentMonth}
                                    currentYear={currentYear}
                                    onPrevMonth={handlePrevMonth}
                                    onNextMonth={handleNextMonth}
                                />
                            )}
                            {step === "time" && selectedDate && (
                                <TimeSlotPicker
                                    key="time"
                                    slots={timeSlots}
                                    selectedTime={selectedTime}
                                    onSelectTime={handleTimeSelect}
                                    selectedDate={selectedDate}
                                />
                            )}
                            {step === "form" && selectedDate && selectedTime && (
                                <BookingForm
                                    key="form"
                                    selectedDate={selectedDate}
                                    selectedTime={selectedTime}
                                    onSubmit={handleFormSubmit}
                                />
                            )}
                            {step === "confirmation" && selectedDate && selectedTime && (
                                <Confirmation
                                    key="confirmation"
                                    name={userName}
                                    selectedDate={selectedDate}
                                    selectedTime={selectedTime}
                                    onReset={handleReset}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </RevealOnScroll>

                {/* Contact Grid */}
                <RevealOnScroll delay={0.3}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16 border border-white/10">
                        <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
                            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/30 uppercase tracking-[0.3em] mb-3">
                                Email
                            </p>
                            <a
                                href="mailto:connecttousama@gmail.com"
                                className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70 hover:text-white transition-colors hoverable"
                            >
                                connecttousama@gmail.com
                            </a>
                        </div>
                        <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
                            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/30 uppercase tracking-[0.3em] mb-3">
                                WhatsApp
                            </p>
                            <a
                                href="https://wa.me/923328384188"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70 hover:text-white transition-colors hoverable"
                            >
                                +92 332 838 4188
                            </a>
                        </div>
                        <div className="p-8">
                            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/30 uppercase tracking-[0.3em] mb-3">
                                Location
                            </p>
                            <span className="font-[family-name:var(--font-jetbrains)] text-sm text-white/70">
                                Gujranwala
                            </span>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
