import React, { useContext } from 'react';
import { Button, Collapse, Typography } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from 'context/AppProvider';
import './styles.scss';

const { Panel } = Collapse;

function RoomList() {
  const { rooms, setIsVisibleAddRoom, setSelectedRoomId } = useContext(AppContext);

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

export default RoomList;
