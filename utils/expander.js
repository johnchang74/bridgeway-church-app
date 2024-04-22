import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export const Expander = ({
  children,
  buttonText,
  selectedBook = "",
  collapsedStyle,
  expandedStyle,
  expand,
  selectBook,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(expand);
  }, [expand]);

  const toggleExpand = () => {
    selectBook(buttonText);
    setIsExpanded(!isExpanded);
  };

  console.log(`cur: ${buttonText} - select: ${selectedBook}`);

  return (
    <Text
      style={isExpanded ? expandedStyle : collapsedStyle}
      key={buttonText.trim().toLowerCase()}
      onPress={toggleExpand}
    >
      {buttonText}
      {isExpanded ? children : ""}
    </Text>
  );
};
