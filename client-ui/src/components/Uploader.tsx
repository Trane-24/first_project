import { Box, Button, IconButton, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import IAsset from 'models/Asset';
import { useSelector } from 'react-redux';
import { selectAssets, selectAssetsIdsToDelete, selectFile } from 'store/assets/assetsSelectors';
import { assetsActions } from 'store/assets/assetsSlice';
import { DeleteOutline as DeleteOutlineIcon, Close as CloseIcon } from '@mui/icons-material';
import { makeStyles } from '@material-ui/styles';
import config from 'config';
import IFile from 'models/File';

type Props ={
  assets?: IAsset[];
  multiple?: boolean;
}

const Uploader:React.FC<Props> = ({ assets: initialAssets = undefined, multiple = false }) => {
  const dispatch = useAppDispatch();
  const classes = useStyle();

  const files = useSelector(selectFile);
  const assets = useSelector(selectAssets);
  const assetsIdsToDelete = useSelector(selectAssetsIdsToDelete);

  const uploadFile = (e:any) => {
    const files = e.target.files;

    dispatch(assetsActions.setFiles(files))
  };

  const deleteFile = (key: string) => {
    dispatch(assetsActions.deleteFile(key));
  };

  const handleAddAssetIdToDelete = (id: string) => {
    dispatch(assetsActions.addAssetIdToDelete(id));
  };

  const handleRemoveAssetIdToDelete = (id: string) => {
    dispatch(assetsActions.removeAssetIdToDelete(id));
  };

  useEffect(() => {
    if (initialAssets) {
      dispatch(assetsActions.addAsset(initialAssets));
    }

    return () => {
      dispatch(assetsActions.setInitialReducer());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box className={classes.contained}>
      {(multiple || (!files.length && !assets.length)) && (
        <Box className={classes.btnBox}>
          <Button
            variant="contained"
            component="label"
            className={classes.btn}
          >
            Upload
            <input
              type="file"
              multiple={multiple}
              onChange={uploadFile}
              hidden
            />
          </Button>
        </Box>
      )}
      <Box className={classes.boxs}>
        {!!files.length && (
          <Box className={classes.box}>
            {files.map((file: IFile) => (
              <Box sx={{ position: 'relative', width: '160px', height: '160px', backgroundColor: '#ddd' }} key={file.key} >
                <img
                  className={classes.img}
                  alt='file'
                  src={URL.createObjectURL(file.file)}
                />

                <Box className={classes.hoverBox}>
                  <Box className={classes.btnDelete} onClick={() => {deleteFile(file.key)}}>
                    <DeleteOutlineIcon />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {!!files.length && !!assets.length && (<Divider sx={{ m: 1 }} />)}

        {!!assets.length && (
          <Box className={classes.box}>
            {assets?.map((asset: IAsset) => (
              <Box key={asset._id} sx={{ position: 'relative', width: '160px', height: '160px', backgroundColor: '#ddd' }}>
                <img
                  className={classes.img}
                  alt='file'
                  src={asset.path}
                />

                <Box className={assetsIdsToDelete.includes(asset._id) ? [classes.hoverBox, classes.activeHoverBox].join(' ') : classes.hoverBox}>
                  {assetsIdsToDelete.includes(asset._id) ? (
                    <IconButton className={classes.btnDelete} onClick={() => handleRemoveAssetIdToDelete(asset._id)}>
                      <CloseIcon />
                    </IconButton>
                  ) : (
                    <IconButton className={classes.btnDelete} onClick={() => handleAddAssetIdToDelete(asset._id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
};

export default Uploader;

const useStyle = makeStyles({
  contained: {
    height: '250px',
    padding: '6px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    '&:hover': {
      border: '1px solid #000',
    }
  },
  boxs: {
    maxHeight: '180px',
    overflowY: 'scroll',
  },
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
  },
  item: {
    position: 'relative',
    width: 'max-content',
    height: '160px',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  btnBox : {
    display: 'flex',
  },
  btn: {
    margin: '0 auto',
    marginBottom: '10px',
  },
  btnDelete: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#fff',
    cursor: 'pointer',
  },
  hoverBox: {
    position: 'absolute',
    top: '0',
    backgroundColor: '#000',
    opacity: '0',
    height: '100%',
    width: '100%',
    transition: 'all 0.3s ease-out',
    '&:hover': {
      opacity: '0.5',
    },
  },
  activeHoverBox: {
    opacity: 0.5,
  }
})
