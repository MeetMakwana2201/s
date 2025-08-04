"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

type ExpandableFilterProps = {
    title: string;
    children: ReactNode;
};

export default function ExpandableFilter({ title, children }: ExpandableFilterProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showToggleButton, setShowToggleButton] = useState(false);

    useEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.scrollHeight;
            setShowToggleButton(height > 300);
        }
    }, [children]);

    return (
        <div className="mb-6">
            <h3 className="font-[outfit] font-black text-xl mb-3">{title}</h3>
            <div
                ref={contentRef}
                className={`flex flex-wrap gap-2 overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-full" : "max-h-[300px]"
                    }`}
            >
                {children}
            </div>
            {showToggleButton && (
                <button
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="mt-2 text-center w-full underline text-base font-semibold transition-colors"
                >
                    {isExpanded ? "View Less" : "View More"}
                </button>
            )}
        </div>
    );
}
