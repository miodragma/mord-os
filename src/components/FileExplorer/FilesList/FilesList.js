import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableHead from '../../UI/TableHead/TableHead';

import { fileExplorerTableHeadConfig } from '../../../config/table-head.config';

import { filterByAscAndDesc } from '../../../utils/filterByAscAndDesc';
import { formatDate, formatTime } from '../../../utils/formatTime';
import outsideClick from '../../../hooks/OutsideClick';

import { programsActions } from '../../Program/store/programs-slice';

import classes from './FilesList.module.scss';

const FilesList = props => {

  const dispatch = useDispatch();

  const { selectedFile, onSelectedFile } = props;
  const actionsRef = useRef(null);

  const { files } = useSelector(state => state.programs);
  const { runningPrograms } = useSelector(state => state.programs);

  const [sortColumn, setSortColumn] = useState('Date modified');
  const [sortOrder, setSortOrder] = useState('DESCENDING');
  const [sortProperty, setSortProperty] = useState('dateModified');

  const onRemoveSelect = useCallback(() => {
    onSelectedFile(null);
  }, [onSelectedFile]);

  outsideClick({ actionsRef, onRemoveSelect })

  const onClickSortHandler = useCallback(data => {
    let sortOrder = data.item.value === data.sortColumn ? data.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING' : data.item.defaultType
    setSortOrder(sortOrder);
    setSortColumn(data.item.value);
    setSortProperty(data.item.property);
  }, []);

  const onClickRowHandler = (e, file) => {
    onSelectedFile({ id: file.id, userId: file.userId });
    if (e.detail === 2) {
      const isExistFileInProgram = runningPrograms.find(program => program?.fileId === file.id);
      if (!isExistFileInProgram) {
        dispatch(programsActions.openProgram({
          id: Date.now(),
          label: 'Notepad',
          type: 'file',
          fileId: file.id,
          currentLabel: file.currentLabel
        }))
      } else {
        dispatch(programsActions.minimizeProgram({ id: isExistFileInProgram.id, value: false }));
        dispatch(programsActions.setCurrentWindowId(isExistFileInProgram.id));
      }
    }
  };

  const allFiles = filterByAscAndDesc([...files], sortOrder, sortProperty).map(file => {
    const dateFormat = formatDate(new Date(JSON.parse(file.dateModified)));
    const timeFormat = formatTime(new Date(JSON.parse(file.dateModified)));
    return (
      <tr
        ref={actionsRef}
        onClick={(e) => onClickRowHandler(e, file)}
        className={`${classes.fileDataInfoWrapper} ${selectedFile?.id === file.id ? classes.selectedFile : ''}`}
        key={file.id}>
        <td><p>{file.currentLabel}</p></td>
        <td>{dateFormat} {timeFormat}</td>
        <td>File Text</td>
      </tr>
    )
  });

  return (
    <table>
      <thead>
      <tr>
        <TableHead
          data={fileExplorerTableHeadConfig}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onClickSort={onClickSortHandler}/>
      </tr>
      </thead>
      <tbody>
      {allFiles}
      </tbody>
    </table>
  )

};

export default FilesList;
