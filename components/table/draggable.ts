// dragDropUtils.ts

import React, {useState} from 'react';
import {Column, DataItem, UseDragDropRetunrn, DragDropParma} from "./index.d";


export const useDragDrop = ({
                                _tableColumns,
                                data,
                                draggable,
                                onDragAfter = () => {
                                }
                            }: DragDropParma): UseDragDropRetunrn => {


    const [tableColumns, setTableColumns] = useState<Column[]>(_tableColumns);
    const [tableData, setTableData] = useState<DataItem[]>(data as DataItem[]);
    const [activeTR, setActiveTR] = useState<null | number>(null);
    const [activeTD, setActiveTD] = useState<null | string>(null);


    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        if (!draggable) return;
        setActiveTD(tableColumns[index].dataIndex);
        e.dataTransfer.setData('sourceIndex', String(index));
    };
    const handleDragStartData = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        if (!draggable) return;
        setActiveTR(index);
        e.dataTransfer.setData('sourceIndexData', String(index));
    };

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>): void => {
        if (!draggable) return;
        e.preventDefault();

    };

    const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        if (!draggable) return;
        setActiveTD(null);
        const sourceIndex: number = parseInt(e.dataTransfer.getData('sourceIndex'));
        const newColumns: Column[] = [...tableColumns];
        const [movedColumn] = newColumns.splice(sourceIndex, 1);
        newColumns.splice(index, 0, movedColumn);
        setTableColumns(newColumns);
        onDragAfter(newColumns, tableData);
    };

    const handleDropData = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        if (!draggable) return;
        setActiveTR(null);
        const sourceIndex: number = parseInt(e.dataTransfer.getData('sourceIndexData'));
        const newTableData: DataItem[] = [...tableData];
        const [movedTableData] = newTableData.splice(sourceIndex, 1);
        newTableData.splice(index, 0, movedTableData);
        setTableData(newTableData);
        onDragAfter(newTableData, tableColumns)
    };

    return {
        tableColumns,
        setTableColumns,
        tableData,
        setTableData,
        activeTR,
        activeTD,
        handleDragStart,
        handleDragStartData,
        handleDragOver,
        handleDrop,
        handleDropData,
    };
};

export default useDragDrop;
