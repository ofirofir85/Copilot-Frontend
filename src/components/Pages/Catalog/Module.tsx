import React, { useState } from 'react';
import Hashtag from './Hashtag';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import '../../../css/hashtags.css';
import { Button } from '@material-ui/core';
interface Props {
  discription?: string;
  hashtags: string[];
}
const Module = (props: Props) => {
  const [isAddClick, setIsAddClick] = useState(false);
  const AddHashtag = (e: any) => {};

  return (
    <div>
      <div className='discription'>
        <div className='title'>Discription</div>
        {props.discription}
      </div>
      <div className='hashtags'>
        {props.hashtags.map((hashtag) => (
          <Hashtag lable={hashtag} />
        ))}
        <div className='addChip'>
          {isAddClick ? (
            <div>
              <input type='text' onKeyDown={(e) => AddHashtag(e)} />
            </div>
          ) : (
            <div>
              <Button onClick={() => setIsAddClick(!isAddClick)}>
                <AddCircleOutlineIcon />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Module;
