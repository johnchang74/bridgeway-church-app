import React, { useEffect, useState, useRef } from "react";
import { Text } from "react-native";

export const Expander = ({
  children,
  buttonText,
  collapsedStyle,
  expandedStyle,
  expand,
  selectBook,
  bookIndex,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const verseBlock = useRef();

  useEffect(() => {
    setIsExpanded(expand);
  }, [expand]);

  const toggleExpand = () => {
    selectBook(buttonText);
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      scrollCallBack({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const scrollCallBack = () => {
    if (verseBlock?.current) {
      verseBlock.current.scrollIntoView();
    }
  };

  return (
    <Text
      allowFontScaling={false}
      style={isExpanded ? expandedStyle : collapsedStyle}
      key={buttonText.trim().toLowerCase()}
      onPress={toggleExpand}
      ref={verseBlock}
    >
      {buttonText}
      {isExpanded ? children : ""}
    </Text>
  );
};
