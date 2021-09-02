import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Typography } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from 'context/AppProvider';
import './styles.scss';

const { Panel } = Collapse;

function RoomList(props) {
  const { rooms, setIsVisibleAddRoom, setSelectedRoomId } = useContext(AppContext);
  useEffect(() => {
    setSelectedRoomId(rooms[0]?.id);
  }, [setSelectedRoomId, rooms]);

  const handleAddRoom = () => setIsVisibleAddRoom(true);
  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <Panel header="Room list" key="1">
        {rooms.map(room => (
          <Typography.Link
            className="room-item"
            key={room.id}
            onClick={() => setSelectedRoomId(room.id)}
          >
            {room.name}
          </Typography.Link>
        ))}

        <Button
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
          onClick={handleAddRoom}
        >
          Add room
        </Button>
      </Panel>
    </Collapse>
  );
}

RoomList.propTypes = {};

export default RoomList;
