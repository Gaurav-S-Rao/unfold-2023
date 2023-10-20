import { Card, Table, TableBody, TableContainer } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useGetAdvertsById } from 'src/api/adverts';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TableSkeleton, useTable } from 'src/components/table';
import { IAdvertItem } from 'src/types/adverts';
import AdvertsTableRow from './adverts-table-row';
import { useAuthContext } from 'src/auth/hooks';

const TABLE_HEAD = [
  { id: 'name', label: 'Advertisement' },
  { id: 'createdAt', label: 'Create at', width: 160 },
  { id: 'website', label: 'Link', width: 180 },
  { id: 'cta', label: 'Start Campaign', width: 180 },
  { id: '', width: 40 },
];

export default function AdvertsPageViewContent() {
  const table = useTable();

  const { user } = useAuthContext();

  const [tableData, setTableData] = useState<IAdvertItem[]>([]);

  const handleViewRow = useCallback(
    (row: IAdvertItem) => {
      console.log(row);
    },
    [tableData]
  );

  useEffect(() => {
    if (user) {
      setTableData(user.advertisements);
    }
  }, [user]);

  return (
    <Card>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              onSort={table.onSort}
            />

            <TableBody>
              {/* {advertsLoading ? (
                [...Array(table.rowsPerPage)].map((i, index) => (
                  <TableSkeleton key={index} sx={{ height: denseHeight }} />
                ))
              ) : ( */}
              <>
                {tableData.map((row) => (
                  <AdvertsTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onViewRow={() => handleViewRow(row)}
                  />
                ))}
              </>
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}
