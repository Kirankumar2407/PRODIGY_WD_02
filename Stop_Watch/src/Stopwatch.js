import React from 'react';
import { useState, useRef, useEffect } from 'react';

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [splits, setSplits] = useState([]);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - time;
    }

    function stop() {
        setIsRunning(false);
    }

    function split() {
        setSplits([...splits, time]);
    }

    function reset() {
        setTime(0);
        setIsRunning(false);
        setSplits([]);
    }

    function formatTime(time) {
        let hrs = Math.floor(time / (1000 * 60 * 60));
        let mins = Math.floor((time / (1000 * 60)) % 60);
        let sec = Math.floor((time / 1000) % 60);
        let ms = Math.floor((time % 1000) / 10);

        hrs = String(hrs).padStart(2, "0");
        mins = String(mins).padStart(2, "0");
        sec = String(sec).padStart(2, "0");
        ms = String(ms).padStart(2, "0");

        return `${hrs}:${mins}:${sec}:${ms}`;
    }

    return (
    <div className="flex flex-col items-center p-4 bg-black min-h-screen">
    <p className="font-extrabold text-white text-4xl mb-4">Stop Watch</p>
    <div className="bg-gray-800 shadow-md rounded-lg p-6 max-w-md w-full">
        <div className="text-5xl font-bold text-center mb-4 text-white">{formatTime(time)}</div>
        <div className="flex justify-center space-x-2 mb-4">
            {!isRunning ? (
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
                    onClick={start}
                >
                    Start
                </button>
            ) : (
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-200"
                    onClick={stop}
                >
                    Stop
                </button>
            )}
            <button
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition duration-200"
                onClick={split}
            >
                Split
            </button>
            <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200"
                onClick={reset}
            >
                Reset
            </button>
        </div>
    </div>
    <div className="bg-gray-800 shadow-md rounded-lg p-6 max-w-md w-full mt-4">
        <h2 className="text-2xl mb-2 font-semibold text-center text-white">Laps</h2>
        <ul className="space-y-2">
            {splits.map((splitTime, index) => (
                <li
                    key={index}
                    className="flex justify-between bg-gray-700 p-2 rounded shadow-sm animate-slideIn"
                >
                    <span className="text-white">Lap {index + 1}</span>
                    <span className="font-mono text-white">{formatTime(splitTime)}</span>
                </li>
            ))}
        </ul>
    </div>
</div>
);
}

export default Stopwatch;
