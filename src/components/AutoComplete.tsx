import React, {FC, useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Icons} from '../assests';
import {RenderIf} from './RenderIf';
import {SuggestionList} from './SuggestionList';
import {HistoryList} from './HistoryList';
import {Place} from '../services/placeApi';

type AutoCompleteInputProps = {
  placeholder: string;
  loading: boolean;
  query: string;
  suggestions: Place[];
  history: string[];
  onChange: (text: string) => void;
  onSelect: (selectedPlace: Place) => void;
  onSelectHistory: (history: string) => void;
  onClear: () => void;
};

export const AutoCompleteInput: FC<AutoCompleteInputProps> = ({
  placeholder = '',
  loading,
  query,
  history,
  suggestions,
  onSelect,
  onChange,
  onSelectHistory,
  onClear,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const textInputRef = useRef<TextInput>(null);

  const onSelectSuggestion = useCallback(
    (place: Place) => {
      onSelect(place);
      textInputRef.current?.blur();
    },
    [onSelect],
  );

  return (
    <>
      <View style={styles.container}>
        <Image source={Icons.Map} style={styles.mapIcon} />
        <TextInput
          ref={textInputRef}
          style={styles.input}
          placeholder={placeholder}
          autoCorrect={false}
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChange}
        />
        <RenderIf condition={query !== '' && !loading}>
          <Pressable onPress={onClear}>
            <Image source={Icons.Clear} style={styles.clearIcon} />
          </Pressable>
        </RenderIf>
        <RenderIf condition={loading}>
          <ActivityIndicator style={styles.indicator} />
        </RenderIf>
        <RenderIf
          condition={isFocused && query !== '' && suggestions?.length > 1}>
          <SuggestionList
            highlight={query}
            onSuggestionClick={onSelectSuggestion}
            suggestions={suggestions}
          />
        </RenderIf>
        <RenderIf condition={isFocused && query === '' && history.length > 0}>
          <HistoryList
            historyList={history}
            onSelectHistory={onSelectHistory}
          />
        </RenderIf>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    marginHorizontal: 12,
    shadowColor: '#6c6c6c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 10,
    marginTop: Platform.OS === 'android' ? 12 : 0,
  },
  input: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 12,
    padding: 0,
  },
  mapIcon: {
    width: 20,
    height: 20,
    marginLeft: 12,
  },
  clearIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 12,
  },
  indicator: {
    marginRight: 12,
  },
});
