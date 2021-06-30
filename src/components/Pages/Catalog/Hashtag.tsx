import { Avatar, Chip } from '@material-ui/core';
import React from 'react';

interface Props {
  lable?: string;
}

const Hashtag = (props: Props) => {
  return (
    <div>
      <Chip
        avatar={<Avatar>#</Avatar>}
        label={props.lable}
        onClick={() => alert('open new module!')}
      />
    </div>
  );
};
export default Hashtag;
