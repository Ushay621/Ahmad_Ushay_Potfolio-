"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";

interface ScrollAnimationProps {
    children: ReactNode;
    className?: string;
    animationType?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-in" | "zoom-out";
    delay?: number;
}

export default function ScrollAnimation({
    children,
    className = "",
    animationType = "fade-up",
    delay = 0,
}: ScrollAnimationProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const hasAnimatedRef = useRef(false);

    const triggerAnimation = useCallback(() => {
        const currentElement = elementRef.current;
        if (currentElement && !hasAnimatedRef.current) {
            setTimeout(() => {
                if (currentElement) {
                    currentElement.classList.add("animated");
                    hasAnimatedRef.current = true;
                }
            }, delay);
        }
    }, [delay]);

    useEffect(() => {
        const currentElement = elementRef.current;
        if (!currentElement) return;

        // Check if element is in viewport
        const isInViewport = () => {
            const rect = currentElement.getBoundingClientRect();
            return (
                rect.top < window.innerHeight * 0.8 &&
                rect.bottom > window.innerHeight * 0.2
            );
        };

        // Initial check on mount
        if (isInViewport()) {
            triggerAnimation();
        }

        // Intersection Observer for scroll-triggered animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        triggerAnimation();
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(currentElement);

        // Handle navigation via hash changes (navbar links)
        const handleNavigation = () => {
            setTimeout(() => {
                if (isInViewport() && !hasAnimatedRef.current) {
                    triggerAnimation();
                }
            }, 300);
        };

        // Listen for hash changes
        window.addEventListener("hashchange", handleNavigation);

        // Also check on scroll for immediate navigation
        const handleScroll = () => {
            if (!hasAnimatedRef.current && isInViewport()) {
                triggerAnimation();
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Check periodically for elements that might have been navigated to
        const checkInterval = setInterval(() => {
            if (!hasAnimatedRef.current && isInViewport()) {
                triggerAnimation();
            }
        }, 500);

        return () => {
            observer.unobserve(currentElement);
            window.removeEventListener("hashchange", handleNavigation);
            window.removeEventListener("scroll", handleScroll);
            clearInterval(checkInterval);
        };
    }, [triggerAnimation]);

    return (
        <div
            ref={elementRef}
            className={`animate-on-scroll ${animationType} ${className}`}
        >
            {children}
        </div>
    );
}

