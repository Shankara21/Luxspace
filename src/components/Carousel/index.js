import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import { addClass, removeClass } from "../../helpers/format/classNameModifier";

export default function Carousel({ children, refContainer }) {
  const refDraghandler = useRef(null);
  const containerClientRect = refContainer.current.getBoundingClientRect();

  const [index, setIndex] = useState(0);

  const threshold = 100;
  const itemToShow = window.innerWidth < 767 ? 1 : 4;
  const DIRECTION_LEFT = "DIRECTION_LEFT";
  const DIRECTION_RIGHT = "DIRECTION_RIGHT";

  const postInitial = useRef();
  const posX1 = useRef();
  const posX2 = useRef();
  const posFinal = useRef();
  const isAllowShift = useRef(true);
  const cards = useRef();
  const cardCount = cards.current?.length || 0;
  const cardSize = cards.current?.[0].offsetWidth || 0;

  const checkIndex = useCallback(
    (e) => {
      if (e.propertyName === "left") {
        setTimeout(() => {
          removeClass(refDraghandler.current, "transition-all duration-200");
        }, 200);
        const isMobile = window.innerWidth < 767 ? 0 : -1;
        if (index <= 0) {
          refDraghandler.current.style.left = 0;
          setIndex(0);
        } else if (index >= cardCount - itemToShow) {
          refDraghandler.current.style.left = -(
            (cardCount - itemToShow + isMobile) * cardSize +
            "px"
          );
          setIndex(cardCount - itemToShow);
        } else if (index === cardCount || index === cardCount - 1) {
          refDraghandler.current.style.left = (cardCount - 1) * cardSize + "px";
          setIndex(cardCount - 1);
        }
      }
      isAllowShift.current = true;
    },
    [cardCount, cardSize, index, itemToShow]
  );

  const shiftItem = useCallback(
    (direction) => {
      addClass(refDraghandler.current, "transition-all duration-200");
      if (isAllowShift.current) {
        if (direction === "DIRECTION_LEFT") {
          setIndex((prev) => prev + 1);
          refDraghandler.current.style.left =
            postInitial.current - cardSize + "px";
        } else if (direction === "DIRECTION_RIGHT") {
          setIndex((prev) => prev - 1);
          refDraghandler.current.style.left =
            postInitial.current + cardSize + "px";
        }
      }
      isAllowShift.current = false;
    },
    [cardSize]
  );

  const onDragMove = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();

      if (e.type === "touchmove") {
        posX2.current = posX1.current - e.touches[0].clientX;
        posX1.current = e.touches[0].clientX;
      } else {
        posX2.current = posX1.current - e.clientX;
        posX1.current = e.clientX;
      }
      refDraghandler.current.style.left =
        refDraghandler.current.offsetLeft - posX2.current + "px";
    },
    [posX1, posX2]
  );
  const onDragEnd = useCallback(
    (e) => {
      e = e || e.window.event;
      e.preventDefault();
      posFinal.current = refDraghandler.current.offsetLeft;

      if (posFinal.current - postInitial.current < -threshold) {
        shiftItem(DIRECTION_LEFT);
      } else if (posFinal.current - postInitial.current > threshold) {
        shiftItem(DIRECTION_RIGHT);
      } else {
        refDraghandler.current.style.left =
          refDraghandler.current.offsetLeft - postInitial.current + "px";
      }
      document.onmouseup = null;
      document.onmousemove = null;
    },
    [shiftItem]
  );

  const onDragStart = useCallback(
    (e) => {
      e = e || window.event;
      e.preventDefault();

      postInitial.current = refDraghandler.current.offsetLeft;

      if (e.type === "touchstart") {
        posX1.current = e.touches[0].clientX;
      } else {
        posX1.current = e.clientX;
        document.onmouseup = onDragEnd;
        document.onmousemove = onDragMove;
      }
    },
    [onDragEnd, onDragMove]
  );

  const onClick = useCallback((e) => {
    e = e || window.event;
    !isAllowShift.current && e.preventDefault();
  }, []);

  useLayoutEffect(() => {
    const refForward = refDraghandler.current;

    refForward.onmousedown = onDragStart;
    refForward.addEventListener("touchstart", onDragStart);
    refForward.addEventListener("touchend", onDragEnd);
    refForward.addEventListener("touchmove", onDragMove);
    refForward.addEventListener("click", onClick);
    refForward.addEventListener("transitionend", checkIndex);

    return () => {
      refForward.removeEventListener("touchstart", onDragStart);
      refForward.removeEventListener("touchend", onDragEnd);
      refForward.removeEventListener("touchmove", onDragMove);
      refForward.removeEventListener("click", onClick);
      refForward.removeEventListener("transitionend", checkIndex);
    };
  }, [onDragStart, onDragMove, onDragEnd, onClick, checkIndex]);

  useLayoutEffect(() => {
    if (refDraghandler.current) {
      cards.current = refDraghandler.current.getElementsByClassName("card");
    }
  }, []);
  return (
    <div
      ref={refDraghandler}
      className="flex -mx-4 flex-row relative "
      style={{ paddingLeft: containerClientRect.left - 16 }}
    >
      {children}
    </div>
  );
}
