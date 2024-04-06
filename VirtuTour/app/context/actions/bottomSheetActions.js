export const initBottomSheetRef = ({bottomSheetRef})=>({
    type: 'INIT_BOTTOM_SHEET_REF',
    bottomSheetRef: bottomSheetRef
});

export const setContentType = ({contentType})=>({
    type: 'SET_BOTTOM_SHEET_CONTENT_TYPE',
    contentType: contentType
});