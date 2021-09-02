import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useFileStore } from '../hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

function AppProvider({ children }) {
  const [isVisibleAddRoom, setIsVisibleAddRoom] = useState(false);
  const [isVisibleInvite, setIsVisibleInvite] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const {
    user: { uid },
  } = useContext(AuthContext);

  const roomsCondition = useMemo(
    () => ({
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    }),
    [uid]
  );
  const rooms = useFileStore('rooms', roomsCondition);

  const selectedRoom = useMemo(
    () => rooms.find(room => room.id === selectedRoomId),
    [rooms, selectedRoomId]
  );
  const usersCondition = useMemo(
    () => ({
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom?.members,
    }),
    [selectedRoom?.members]
  );
  const members = useFileStore('users', usersCondition);
  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        selectedRoomId,
        setSelectedRoomId,
        isVisibleAddRoom,
        setIsVisibleAddRoom,
        isVisibleInvite,
        setIsVisibleInvite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppProvider;
