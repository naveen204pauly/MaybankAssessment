import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {Icons} from '../assests';
import {Place} from '../services/placeApi';

interface SuggestionListProps {
  suggestions: Place[];
  highlight: string;
  onSuggestionClick: (data: Place) => void;
}

export const SuggestionList: FC<SuggestionListProps> = ({
  suggestions = [],
  highlight,
  onSuggestionClick,
}) => {
  const getHighlightedText = (text: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text numberOfLines={3}>
        {parts.map((part: string, index: number) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={styles.highlitedText}>
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          ),
        )}
      </Text>
    );
  };

  return (
    <ScrollView
      style={styles.suggestionContainer}
      keyboardShouldPersistTaps={'handled'}>
      {suggestions.map((suggestion, index) => {
        const currSuggestion = suggestion.title;
        const secondaryText = suggestion?.description;
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.suggestionRow}
            key={index}
            onPress={() => onSuggestionClick(suggestion)}
            id={`suggestion-${index}`}>
            <View style={styles.markerIconContainer}>
              <Image source={Icons.Marker} style={styles.markerIcon} />
            </View>
            <View style={styles.suggestionTextContainer}>
              {getHighlightedText(currSuggestion)}
              {secondaryText && (
                <Text numberOfLines={2} style={styles.secondaryText}>
                  {secondaryText}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  suggestionContainer: {
    backgroundColor: 'white',
    // height: 300,
    // minHeight: 150,
    maxHeight: 350,
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    top: 46,
    borderRadius: 8,
    shadowColor: '#6c6c6c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    padding: 12,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f2f0ef',
    borderBottomWidth: 1,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  markerIcon: {
    height: 12,
    width: 12,
    tintColor: '#766760',
  },
  markerIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    backgroundColor: '#f2f0ef',
    borderRadius: 12,
    marginRight: 12,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  secondaryText: {
    fontSize: 12,
    color: 'gray',
  },
  highlitedText: {fontWeight: 'bold'},
});
