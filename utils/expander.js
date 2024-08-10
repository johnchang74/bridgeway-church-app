import React, { useEffect, useState, useRef } from "react";
import { ScrollView, Text } from "react-native";
import { minHeight } from "react-native-media-queries";

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
  const scrollRef = useRef(null);

  useEffect(() => {
    setIsExpanded(expand);
  }, [expand]);

  const toggleExpand = () => {
    selectBook(buttonText);
    setIsExpanded(!isExpanded);
    const { current } = scrollRef;
    if (!current && isExpanded) {
      current.scrollIntoView();
    }
  };

  return (
    <Text
      allowFontScaling={false}
      style={isExpanded ? expandedStyle : collapsedStyle}
      key={buttonText.trim().toLowerCase()}
      onPress={toggleExpand}
      ref={scrollRef}
    >
      {buttonText}
      {isExpanded ? children : ""}
    </Text>
  );
};
