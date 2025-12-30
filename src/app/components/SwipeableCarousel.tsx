"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

interface SwipeableCarouselProps {
    children: ReactNode[];
}

export default function SwipeableCarousel({ children }: SwipeableCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [dragProgress, setDragProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const handlePrev = () => {
        setIsPaused(true);
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : children.length - 1));
        setTimeout(() => setIsPaused(false), 2000);
    };

    const handleNext = () => {
        setIsPaused(true);
        setCurrentIndex((prev) => (prev < children.length - 1 ? prev + 1 : 0));
        setTimeout(() => setIsPaused(false), 2000);
    };

    // Auto-play: Change every 4 seconds in circular manner (left to right)
    useEffect(() => {
        // Clear existing interval
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
        }

        // Don't auto-play if dragging or paused
        if (isDragging || isPaused) return;

        // Set up auto-play interval
        autoPlayIntervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev < children.length - 1 ? prev + 1 : 0));
        }, 4000); // 4 seconds

        return () => {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
        };
    }, [isDragging, isPaused, children.length]);

    // Mouse drag handlers - horizontal drag controls vertical scroll
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setIsPaused(true); // Pause auto-play on interaction
        setStartX(e.pageX);
        setCurrentX(e.pageX);
        setDragProgress(0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            e.preventDefault();
        }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setIsDragging(false);
        e.preventDefault();

        const deltaX = startX - currentX;
        // Responsive threshold: smaller on mobile
        const threshold = window.innerWidth < 768 ? 50 : 80;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                // Swiped left - go to next
                setCurrentIndex((prev) => (prev < children.length - 1 ? prev + 1 : 0));
            } else {
                // Swiped right - go to previous
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : children.length - 1));
            }
        }
        setDragProgress(0);
    };

    // Touch handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setIsPaused(true); // Pause auto-play on interaction
        setStartX(e.touches[0].pageX);
        setCurrentX(e.touches[0].pageX);
        setDragProgress(0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const deltaX = e.touches[0].pageX - startX;
        setCurrentX(e.touches[0].pageX);
        const progress = Math.max(-1, Math.min(1, deltaX / 200));
        setDragProgress(progress);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!isDragging) return;
        setIsDragging(false);

        const endX = e.changedTouches[0].pageX;
        const deltaX = startX - endX;
        // Smaller threshold for mobile (50px instead of 80px)
        const threshold = window.innerWidth < 768 ? 50 : 80;

        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                setCurrentIndex((prev) => (prev < children.length - 1 ? prev + 1 : 0));
            } else {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : children.length - 1));
            }
        }
        setDragProgress(0);

        // Resume auto-play after 2 seconds
        setTimeout(() => {
            setIsPaused(false);
        }, 2000);
    };

    // Scroll-based navigation - page scroll changes carousel slides
    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        if (!wrapperElement) return;

        let scrollCooldown = false;
        let lastWheelTime = 0;
        let isCarouselInView = false;

        // Check if carousel is in viewport
        const checkCarouselInView = () => {
            const rect = wrapperElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Carousel is in view if it's visible on screen (at least 50% visible)
            isCarouselInView = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
        };

        const handleWheel = (e: WheelEvent) => {
            if (isDragging) return;

            checkCarouselInView();

            // Only handle scroll if carousel is in view
            if (!isCarouselInView) return;

            // Only handle vertical scroll (down = next, up = previous)
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                const now = Date.now();
                if (now - lastWheelTime < 800) return; // Throttle
                if (scrollCooldown) return;

                scrollCooldown = true;

                // Scroll down = next slide
                if (e.deltaY > 50) {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIndex((prev) => (prev < children.length - 1 ? prev + 1 : 0));
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 2000);
                    lastWheelTime = now;
                }
                // Scroll up = previous slide
                else if (e.deltaY < -50) {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : children.length - 1));
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 2000);
                    lastWheelTime = now;
                }

                setTimeout(() => {
                    scrollCooldown = false;
                }, 1000);
            }
        };

        // Also handle scroll event for page scrolling
        const handleScroll = () => {
            if (isDragging) return;
            checkCarouselInView();
        };

        // Initial check
        checkCarouselInView();

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [currentIndex, children.length, isDragging]);

    // Global mouse events for drag - horizontal drag
    useEffect(() => {
        if (!isDragging) return;

        const handleGlobalMouseMove = (e: MouseEvent) => {
            const deltaX = e.pageX - startX;
            setCurrentX(e.pageX);
            const progress = Math.max(-1, Math.min(1, deltaX / 200));
            setDragProgress(progress);
        };

        const handleGlobalMouseUp = () => {
            const deltaX = startX - currentX;
            // Responsive threshold: smaller on mobile
            const threshold = window.innerWidth < 768 ? 50 : 80;

            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    // Swiped left - go to next (right)
                    setCurrentIndex((prev) => (prev < children.length - 1 ? prev + 1 : 0));
                } else {
                    // Swiped right - go to previous (left)
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : children.length - 1));
                }
            }
            setIsDragging(false);
            setDragProgress(0);
        };

        window.addEventListener("mousemove", handleGlobalMouseMove);
        window.addEventListener("mouseup", handleGlobalMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleGlobalMouseMove);
            window.removeEventListener("mouseup", handleGlobalMouseUp);
        };
    }, [isDragging, startX, currentX, currentIndex, children.length]);

    return (
        <ScrollAnimation animationType="fade-up">
            <div
                ref={wrapperRef}
                className="carousel-wrapper relative w-full overflow-hidden select-none md:min-h-[600px] min-h-[400px]"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={(e) => {
                    handleMouseUp(e);
                    setTimeout(() => setIsPaused(false), 1000);
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    cursor: isDragging ? "grabbing" : "grab",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    touchAction: "pan-y",
                }}
            >
                {/* Navigation Buttons - Left/Right */}
                <button
                    onClick={handlePrev}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 active:bg-black/95 text-green-400 p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] backdrop-blur-sm"
                    aria-label="Previous"
                >
                    <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 active:bg-black/95 text-green-400 p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] backdrop-blur-sm"
                    aria-label="Next"
                >
                    <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
                </button>

                {/* Smooth Fade & Slide Animation */}
                <div
                    className="relative w-full overflow-hidden md:min-h-[600px] min-h-[400px]"
                    style={{
                        height: "100%",
                    }}
                >
                    <div
                        ref={containerRef}
                        className="relative w-full"
                        style={{
                            height: "100%",
                        }}
                    >
                        {children.map((child, index) => {
                            const isActive = index === currentIndex;
                            const isNext = index === currentIndex + 1 || (currentIndex === children.length - 1 && index === 0);
                            const isPrev = index === currentIndex - 1 || (currentIndex === 0 && index === children.length - 1);

                            // Smooth fade and slide animation
                            let translateX = 0;
                            let opacity = 0;
                            let scale = 0.95;

                            if (isActive) {
                                translateX = 0;
                                opacity = 1;
                                scale = 1;
                            } else if (isNext) {
                                translateX = 100; // Right side
                                opacity = 0;
                                scale = 0.9;
                            } else if (isPrev) {
                                translateX = -100; // Left side
                                opacity = 0;
                                scale = 0.9;
                            } else {
                                translateX = index > currentIndex ? 100 : -100;
                                opacity = 0;
                                scale = 0.85;
                            }

                            // Add drag offset
                            if (isDragging) {
                                const dragOffset = dragProgress * 100;
                                if (isActive) translateX += dragOffset;
                                else if (isNext && dragProgress < 0) translateX = 100 + dragOffset;
                                else if (isPrev && dragProgress > 0) translateX = -100 + dragOffset;
                            }

                            return (
                                <div
                                    key={index}
                                    className="absolute top-0 left-0 w-full"
                                    style={{
                                        transform: `translateX(${translateX}%) scale(${scale})`,
                                        opacity: opacity,
                                        zIndex: isActive ? 10 : isNext || isPrev ? 5 : 1,
                                        transition: isDragging
                                            ? "transform 0.1s ease-out, opacity 0.1s ease-out"
                                            : "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                                        pointerEvents: isActive ? "auto" : "none",
                                    }}
                                >
                                    <div className="relative w-full">
                                        {child}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4 px-4">
                    {children.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsPaused(true);
                                setCurrentIndex(index);
                                setTimeout(() => setIsPaused(false), 2000);
                            }}
                            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 touch-manipulation ${index === currentIndex
                                ? "w-6 md:w-8 bg-green-400 shadow-[0_0_10px_rgba(57,255,20,0.6)]"
                                : "w-1.5 md:w-2 bg-white/30 hover:bg-white/50 active:bg-white/60"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </ScrollAnimation>
    );
}

