import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgramWindowButton from '../UI/ProgramWindowButton/ProgramWindowButton';
import ProgramTaskBar from '../UI/ProgramTaskBar/ProgramTaskBar';
import TableHead from '../UI/TableHead/TableHead';

import { formatDate, formatTime } from '../../utils/formatTime';
import { filterByAscAndDesc } from '../../utils/filterByAscAndDesc';
import { fileExplorerButtons } from '../../config/program-task.config';
import { fileExplorerTableHeadConfig } from '../../config/table-head.config';

import { programsActions } from '../Program/store/programs-slice';

import classes from './FileExplorer.module.scss';

const FileExplorer = () => {

  const dispatch = useDispatch();

  const { files } = useSelector(state => state.programs);
  const [selectedFile, setSelectedFile] = useState(null);

  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('DESCENDING');
  const [sortProperty, setSortProperty] = useState('currentLabel');

  const onClickDeleteHandler = useCallback(() => {
    dispatch(programsActions.deleteFile(selectedFile));
    setSelectedFile(null)
  }, [dispatch, selectedFile])

  const onClickRowHandler = (e, file) => {
    setSelectedFile(file.id);
    if (e.detail === 2) {
      dispatch(programsActions.openProgram({
        id: Date.now(),
        label: 'Notepad',
        type: 'file',
        fileId: file.id,
        currentLabel: file.currentLabel
      }))
    }
  };

  const fileExplorerTaskBarButtons = fileExplorerButtons.map((button, index) => <ProgramWindowButton
    key={button.label + index}
    classNames={classes.programWindowButton}
    label={button.label}
    disabled={!(button.disabled === false && selectedFile)}
    onClickButton={onClickDeleteHandler}/>)

  const allFiles = filterByAscAndDesc([...files], sortOrder, sortProperty).map(file => {
    const dateFormat = formatDate(new Date(JSON.parse(file.dateModified)));
    const timeFormat = formatTime(new Date(JSON.parse(file.dateModified)));
    return (
      <tr
        onClick={(e) => onClickRowHandler(e, file)}
        className={`${classes.fileDataInfoWrapper} ${selectedFile === file.id ? classes.selectedFile : ''}`}
        key={file.id}>
        <td><p>{file.currentLabel}</p></td>
        <td>{dateFormat} {timeFormat}</td>
        <td>File Text</td>
      </tr>
    )
  });

  const onClickSortHandler = useCallback(data => {
    let sortOrder = data.item.value === data.sortColumn ? data.sortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING' : data.item.defaultType
    setSortOrder(sortOrder);
    setSortColumn(data.item.value);
    setSortProperty(data.item.property);
  }, []);

  return (
    <div className={classes.fileExplorer}>
      <ProgramTaskBar>
        {fileExplorerTaskBarButtons}
      </ProgramTaskBar>
      <div className={allFiles.length > 12 ? classes.tableWrapper : ''}>
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
      </div>
    </div>
  )

};

export default FileExplorer;
