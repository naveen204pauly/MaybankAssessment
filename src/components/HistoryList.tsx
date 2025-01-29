import React, {FC, memo, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {Icons} from '../assests';

interface HistoryListProps {
  historyList: string[];
  onSelectHistory: (query: string) => void;
}

export const HistoryList: FC<HistoryListProps> = memo(
  ({historyList = [], onSelectHistory}) => {
    const handlePress = useCallback(
      (query: string) => {
        onSelectHistory(query);
      },
      [onSelectHistory],
    );
    return (
      <ScrollView style={styles.suggestionContainer}>
        {historyList.map((history, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.suggestionRow}
              key={index}
              onPress={() => handlePress(history)}
              id={`suggestion-${index}`}>
              <View style={styles.markerIconContainer}>
                <Image source={Icons.History} style={styles.markerIcon} />
              </View>
              <Text>{history}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  },
);

const styles = StyleSheet.create({
  suggestionContainer: {
    backgroundColor: 'white',
    // height: 300,
    // minHeight: 150,
    maxHeight: 350,
    width: '100%',
    position: 'absolute',
    top: 46,
    borderRadius: 8,
    shadowColor: '#6c6c6c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    // elevation: 5,
    padding: 12,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f2f0ef',
    borderBottomWidth: 1,
    paddingVertical: 8,
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
});
