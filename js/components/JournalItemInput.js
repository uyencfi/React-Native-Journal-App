import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { SimpleLineIcons } from '@expo/vector-icons';
import TouchableItem from './TouchableItem';
import Store from '../Store';

export default function JournalItemInput({ onSubmit, refresh }) {
  const [photo, setPhoto] = useState('');
  const textInput = useRef(null);

  const _launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setPhoto(result.uri);
      textInput.current.focus();
    }
  };

  const _submit = text => {
    textInput.current.clear();
    onSubmit(text, photo);
    setPhoto('');
  };

  const _getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
      );
      if (status !== 'granted') {
        alert(
          'Sorry, we need camera & camera roll permissions to make this work!',
        );
      }
    }
  };

  const _deleteItems = () => {
    Alert.alert(
      'Einträge löschen',
      'Sollen wirklich alle Einträge gelöscht werden?',
      [
        {
          text: 'Nein',
          style: 'cancel',
        },
        {
          text: 'Ja',
          onPress: async () => {
            await Store.deleteItems();
            refresh();
          },
        },
      ],
    );
  };

  useEffect(() => {
    _getPermissionAsync();
  });

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.photoIcon}>
            <TouchableItem onPress={() => _launchCamera()}>
              <SimpleLineIcons name="camera" size={24} color="lightgray" />
            </TouchableItem>
          </View>
          <TextInput
            style={styles.input}
            ref={textInput}
            underlineColorAndroid="transparent"
            placeholder="Tagebucheintrag erstellen"
            returnKeyType="done"
            onSubmitEditing={event => _submit(event.nativeEvent.text)}
            onBlur={() => setPhoto('')}
          />
        </View>
        <TouchableItem onPress={() => _deleteItems()}>
          <SimpleLineIcons name="trash" size={24} color="lightgray" />
        </TouchableItem>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  inputContainer: {
    marginRight: 8,
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 4,
  },
  photoIcon: {
    alignSelf: 'center',
    marginLeft: 4,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 40,
  },
});
