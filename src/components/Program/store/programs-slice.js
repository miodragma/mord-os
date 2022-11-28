import { createSlice } from '@reduxjs/toolkit';

const programsSlice = createSlice({
  name: 'programs',
  initialState: {
    runningPrograms: [],
    files: [],
    currentWindowId: null,
    groups: [],
    activeFolder: 'myFiles'
  },
  reducers: {
    openProgram(state, action) {
      state.runningPrograms = [...state.runningPrograms, action.payload];
    },
    minimizeProgram(state, action) {
      const findProgramIndex = state.runningPrograms.findIndex(program => program.id === action.payload.id);
      state.runningPrograms[findProgramIndex] = {
        ...state.runningPrograms[findProgramIndex],
        isMinimized: action.payload.value
      }
    },
    closeProgram(state, action) {
      state.runningPrograms = state.runningPrograms.filter(program => program.id !== action.payload);
    },
    setCurrentWindowId(state, action) {
      state.currentWindowId = action.payload;
    },
    setFiles(state, action) {
      state.files = action.payload.data;
      state.activeFolder = action.payload.activeFolder;
    },
    saveFile(state, action) {
      if ((state.activeFolder === 'myFiles' && action.payload.groupId === null) || state.activeFolder === action.payload.groupId) {
        const findRunningProgramIndex = state.runningPrograms.findIndex(program => program.id === action.payload.programId);
        const runningProgramToUpdate = { ...state.runningPrograms[findRunningProgramIndex] };
        runningProgramToUpdate.currentLabel = action.payload.currentLabel;
        runningProgramToUpdate.fileId = action.payload.id;

        state.files = [...state.files, action.payload];
        state.runningPrograms[findRunningProgramIndex] = runningProgramToUpdate;
      }
    },
    updateFile(state, action) {
      if ((state.activeFolder === 'myFiles' && action.payload.groupId === null) || state.activeFolder === action.payload.groupId) {
        const findFileIndexToUpdate = state.files.findIndex(file => file.id === action.payload.id);
        const fileToUpdate = { ...state.files[findFileIndexToUpdate] };
        fileToUpdate.value = action.payload.value;
        state.files[findFileIndexToUpdate] = fileToUpdate;
      }
    },
    deleteFile(state, action) {
      state.files = state.files.filter(file => file.id !== action.payload);
      state.runningPrograms = state.runningPrograms.filter(file => file.fileId !== action.payload);
    },
    createNewGroup(state, action) {
      state.groups = [...state.groups, action.payload];
    },
    setGroups(state, action) {
      state.groups = action.payload;
    },
    deleteGroup(state, action) {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    }
  }
});

export const programsActions = programsSlice.actions;

export default programsSlice;
