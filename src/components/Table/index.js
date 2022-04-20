import React, { useState } from 'react'

import indexStyle from './index.module.scss'

import { Button, Checkbox, Col, Row, Table } from 'antd';

import Header from '../Header';

function RoomsTablePage({rooms, singleRoom}) {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
    filterRooms: null,
    isChecked: false
  })

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    })
  };

  const onChange = (e) => {
    let result = rooms.filter(item => !item.guest)
    setState({
      filterRooms: result, 
      isChecked: e.target.checked 
    })
  }

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };


    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || [{}];
    filteredInfo = filteredInfo || [{}];
    
    let isChecked = state.isChecked;
    let filterRooms = state.filterRooms;

    const columns = [
      {
        title: 'Number',
        dataIndex: 'number'
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters: [
          { text: 'Standard', value: 'standard' },
          { text: 'Suite', value: 'suite' },
          { text: 'Deluxe', value: 'deluxe' },
        ],
          filteredValue: filteredInfo.type || null,
            onFilter: (value, record) => record.type.includes(value),
            sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order,
            ellipsis: true,
      },
      {
        title: 'Occupancy',
        dataIndex: 'occupancy',
        key: 'occupancy',
        filters: [
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ],
        filteredValue: filteredInfo.occupancy || null,
          onFilter: (value, record) =>  record.occupancy === value,
          sortOrder: sortedInfo.columnKey === 'occupancy' && sortedInfo.order,
          ellipsis: true,
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Guest',
        dataIndex: 'guest',
        key: 'guest',
        filters: [
          { text: 'Golden Branch', value: 'Golden Branch' },
          { text: 'Ratliff Schwartz', value: 'Ratliff Schwartz' },
          { text: 'Maggie Rollins', value: 'Maggie Rollins' },
          { text: 'Merritt Page', value: 'Merritt Page' },
          { text: 'Barker Frost', value: 'Barker Frost' },
          { text: 'Macias Nash', value: 'Macias Nash' },
          { text: 'Page Walton', value: 'Page Walton' },
          { text: 'Natalia Soto', value: 'Natalia Soto' },
          { text: 'Shelia Sanders', value: 'Shelia Sanders' },
          { text: 'Morgan Reed', value: 'Morgan Reed' },
          { text: 'Delgado Santana', value: 'Delgado Santana' },
          { text: 'Horne Downs', value: 'Horne Downs' },
        ],
        
          filteredValue: filteredInfo.guest || null,
            onFilter: (value, record) => record.guest.includes(value),
            sortOrder: sortedInfo.columnKey === 'guest' && sortedInfo.order,
            ellipsis: true,
      },
      {
        render: (record) => {
          return  <Button type="primary" onClick={ () => singleRoom(record.number) }>More information</Button>
        }
      },
    ];

    return <div className={indexStyle.rooms_table}>
      <Row className={indexStyle.tablePosition}>
            <Col>
                <div className={indexStyle.filterButtons}>
                    <Button onClick={clearAll} type="primary">Clear all filters</Button>
                    <Checkbox onChange={onChange}>Free rooms only</Checkbox>
                  </div>
              <Table className={indexStyle.table}
                  columns={columns}
                  dataSource={ isChecked ? filterRooms : rooms && rooms.map(item => item) }
                  size={ 'middle' }
                  loading={ rooms ? false : true }
                  pagination={ { position: ['bottomCenter'] } }
                  showHeader={true}
                  onChange={handleChange}
                  rowKey={ rooms && rooms.key}
                />
            </Col>
      </Row>
    </div>
}


export default RoomsTablePage
